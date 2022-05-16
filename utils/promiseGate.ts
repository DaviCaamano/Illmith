const PROMISE_GATE_DEFAULT_VALUE = 10;

export const promiseGate = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
  argumentCollection: any[],
  gateLimit: number = PROMISE_GATE_DEFAULT_VALUE,
  originalResolve: any = null,
  valueCollection: any[] = [],
) => {
  if (!valueCollection) valueCollection = [];
  return new Promise((resolve) => {
    const prmCollection = [];
    for (let i = 0; i < gateLimit && argumentCollection.length > 0; i++) {
      prmCollection.push(callback(...argumentCollection.shift()));
    }

    Promise.all(prmCollection).then((values) => {
      if (valueCollection.length > 0) {
        valueCollection.push([...values]);
        values = valueCollection;
      } else valueCollection = values;
      //Always finally resolve with the last
      if (!originalResolve) originalResolve = resolve;

      if (argumentCollection.length === 0) return originalResolve(values);
      //if there are more promises to process.
      promiseGate(
        callback,
        argumentCollection,
        gateLimit,
        originalResolve,
        values,
      ).then();
    });
  });
};
