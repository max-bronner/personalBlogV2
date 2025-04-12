import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals/attribution';

const wasFetchLater = sessionStorage.getItem('fetchLater');
const isFetchLater = Math.random() < 0.5;
const navigation = performance.getEntriesByType('navigation')[0];
console.log(isFetchLater);
sessionStorage.setItem('fetchLater', isFetchLater);

const onHidden = (callback) => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      callback();
    }
  });
};

const useRequestHandler = (endpoint) => {
  let beaconResult = null;
  let beaconAbort = null;

  const updateBeacon = (data) => {
    const pending = !beaconResult || !beaconResult.sent;
    if (pending && beaconAbort) {
      beaconAbort.abort();
    }

    createBeacon(data);
  };

  const createBeacon = (data) => {
    if (beaconResult && beaconResult.sent) {
      return;
    }

    beaconAbort = new AbortController();
    beaconResult = fetchLater({
      url: endpoint,
      method: 'POST',
      body: data,
      signal: beaconAbort.signal,
    });
  };

  const send = (rawData) => {
    const data = JSON.stringify(rawData);
    console.log(rawData);
    /* if (isFetchLater) {
      updateBeacon(data);
    } else {
      navigator.sendBeacon(endpoint, data);
    } */
  };

  return { send };
};

const useDataStorage = () => {
  const requestHandler = useRequestHandler(
    'https://morning-mud-4dc5.max2bronner.workers.dev',
  );
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  let storage = {};

  const track = (data) => {
    storage = {
      ...storage,
      ...data,
    };

    const dataToSend = {
      ...storage,
      id,
      timestamp,
      fetchLater: Boolean(wasFetchLater),
    };

    if (isFetchLater) {
      requestHandler.send(dataToSend);
    } else {
      onHidden(() => {
        if (Object.keys(storage).length > 0) {
          requestHandler.send(dataToSend);
        }
        storage = {};
      });
    }
  };

  return { track };
};

const { track } = useDataStorage();

onTTFB(({ value, attribution, navigationType }) => {
  const metrics = {
    ttfb: {
      value,
      navigationType,
      cacheDuration: attribution.cacheDuration,
      dnsDuration: attribution.dnsDuration,
      connectionDuration: attribution.connectionDuration,
      requestDuration: attribution.requestDuration,
      waitingDuration: attribution.connectionDwaitingDurationuration,
      requestStart: navigation.requestStart,
      responseEnd: navigation.responseEnd,
      responseStart: navigation.responseStart,
      fetchStart: navigation.fetchStart,
      finalResponseHeadersStart: navigation.finalResponseHeadersStart,
      domInteractive: navigation.domInteractive,
      domComplete: navigation.domComplete,
      connectEnd: navigation.connectEnd,
      connectStart: navigation.connectStart,
    },
  };

  track(metrics);
});

onFCP(({ value, attribution }) => {
  const metrics = {
    fcp: {
      value,
      firstByteToFCP: attribution.firstByteToFCP,
      loadState: attribution.loadState,
      startTime: attribution.fcpEntry?.startTime,
      entryType: attribution.fcpEntry?.entryType,
      duration: attribution.fcpEntry?.duration,
    },
  };

  track(metrics);
});

onLCP(({ value, attribution }) => {
  const metrics = {
    lcp: {
      value,
      element: attribution.element,
      url: attribution.url,
      resourceLoadDelay: attribution.resourceLoadDelay,
      resourceLoadDuration: attribution.resourceLoadDuration,
      elementRenderDelay: attribution.elementRenderDelay,
      resourceLoadDelay: attribution.resourceLoadDelay,
    },
  };

  track(metrics);
});
