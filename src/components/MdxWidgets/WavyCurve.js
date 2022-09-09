import { useRef, useState } from 'react';
import {motion} from 'framer-motion';
import useDimensions from '../../hooks/useDimensions';

function WavyCurve({className}) {
  const [stiffness, setStiffness] = useState(0);
  const [damping, setDamping] = useState(0);
  const [mass, setMass] = useState(0);
  const [frameRate, setFrameRate] = useState(0);
  const ref = useRef();
  const {width, height} = useDimensions();
  
  return (
    <div className={className} ref={ref}>
      <motion.svg viewBox={`0 0 ${width} ${height}`}>

      </motion.svg>
    </div>
  );
}