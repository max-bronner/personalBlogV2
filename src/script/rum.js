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
