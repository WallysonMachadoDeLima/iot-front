import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function useEffectSkipFirst(callback: EffectCallback, dependencies: DependencyList) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
