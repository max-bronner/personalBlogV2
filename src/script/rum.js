import { onFCP, onLCP, onTTFB } from 'web-vitals/attribution';

let isFetchLater;

const onBFCache = (callback) => {
  addEventListener(
    'pageshow',
    (event) => {
      if (event.persisted) {
        callback(event);
      }
    },
    true,
  );
};

const round = (number) => {
  if (typeof number !== 'number' || number !== number) return;
  return Math.round(number);
};

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
    beaconResult = fetchLater(endpoint, {
      method: 'POST',
      body: data,
      signal: beaconAbort.signal,
    });
  };

  const send = (rawData) => {
    const data = JSON.stringify(rawData);
    if (isFetchLater) {
      updateBeacon(data);
    } else {
      navigator.sendBeacon(endpoint, data);
    }
  };

  return { send };
};

const useDataStorage = () => {
  const requestHandler = useRequestHandler(
    'https://morning-mud-4dc5.max2bronner.workers.dev',
  );

  let id, timestamp, wasFetchLater, storage;

  const initializeStorage = () => {
    id = crypto.randomUUID();
    timestamp = Date.now();
    wasFetchLater = sessionStorage.getItem('fetchLater') === 'true';
    isFetchLater = Math.random() < 0.5;
    sessionStorage.setItem('fetchLater', isFetchLater);
    storage = {};
    console.log(isFetchLater, wasFetchLater);
  };

  initializeStorage();
  onBFCache(() => {
    initializeStorage();
  });

  const track = (data) => {
    storage = {
      ...storage,
      ...data,
    };

    if (isFetchLater) {
      requestHandler.send({
        ...storage,
        id,
        timestamp,
        fetchLater: wasFetchLater,
      });
    } else {
      onHidden(() => {
        if (Object.keys(storage).length > 0) {
          requestHandler.send({
            ...storage,
            id,
            timestamp,
            fetchLater: wasFetchLater,
          });
          storage = {};
        }
      });
    }
  };

  return { track };
};

const { track } = useDataStorage();

onBFCache(() => {});

onTTFB(({ value, attribution, navigationType }) => {
  const navigation = performance.getEntriesByType('navigation')[0];
  const metrics = {
    navigationType,
    ttfb: {
      value: round(value),
      cacheDuration: round(attribution.cacheDuration),
      dnsDuration: round(attribution.dnsDuration),
      connectionDuration: round(attribution.connectionDuration),
      requestDuration: round(attribution.requestDuration),
      waitingDuration: round(attribution.waitingDuration),
      requestStart: round(navigation.requestStart),
      responseEnd: round(navigation.responseEnd),
      responseStart: round(navigation.responseStart),
      fetchStart: round(navigation.fetchStart),
      domInteractive: round(navigation.domInteractive),
      domComplete: round(navigation.domComplete),
      connectEnd: round(navigation.connectEnd),
      connectStart: round(navigation.connectStart),
    },
  };

  track(metrics);
});

onFCP(({ value, attribution }) => {
  const metrics = {
    fcp: {
      value: round(value),
      firstByteToFCP: round(attribution.firstByteToFCP),
      loadState: attribution.loadState,
      startTime: round(attribution.fcpEntry?.startTime) ?? null,
      entryType: attribution.fcpEntry?.entryType ?? null,
      duration: round(attribution.fcpEntry?.duration) ?? null,
    },
  };

  track(metrics);
});

onLCP(({ value, attribution }) => {
  const metrics = {
    lcp: {
      value: round(value),
      element: attribution.element ?? null,
      url: attribution.url ?? null,
      resourceLoadDelay: round(attribution.resourceLoadDelay),
      resourceLoadDuration: round(attribution.resourceLoadDuration),
      elementRenderDelay: round(attribution.elementRenderDelay),
    },
  };

  track(metrics);
});
