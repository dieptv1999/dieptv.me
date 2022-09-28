import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  
  useLayoutEffect(() => {
    if (ref?.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  }, [ref]);
  
  return useMemo(() => dimensions, [dimensions]);
}

export default useDimensions;