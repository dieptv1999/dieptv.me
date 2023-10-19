import { useMemo, useRef, useState } from 'react';
import {motion} from 'framer-motion';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { curveBasisOpen } from '@visx/curve';
import useDimensions from '../../hooks/useDimensions';
import styles from './MdxWidgets.module.css';

const getPoints = (stiffness, mass, damping, nloop = 600) => {
  /* Spring Length, set to 1 for simplicity */
  const springLength = 1;

  /* Object position and velocity. */
  let x = 2;
  let v = 0;

  /* Spring stiffness, in kg / s^2 */
  const k = -stiffness;

  /* Damping constant, in kg / s */
  const d = -damping;

  /* Framerate: we want 60 fps hence the framerate here is at 1/60 */
  const frameRate = 1 / 60;

  const positions = [];
  let i = 0;

  /* We loop 600 times, i.e. for 600 frames which is equivalent to 10s*/
  while (i < nloop) {
    const Fspring = k * (x - springLength);
    const Fdamping = d * v;

    const a = (Fspring + Fdamping) / mass;
    v += a * frameRate;
    x += v * frameRate;

    i++;

    positions.push({
      y: x, // x is the position
      x: i, // i is the frame
    });
  }

  return positions;
};

export const WavyCurve = ({className = ''}) => {
  const [stiffness, setStiffness] = useState(20);
  const [damping, setDamping] = useState(0);
  const [mass, setMass] = useState(1);
  const [frameRate, setFrameRate] = useState(0);
  const ref = useRef();
  const {width, height} = useDimensions(ref);

  const initialData = getPoints(stiffness, mass, damping);
  const [data, setData] = useState(initialData);

  const xScale = useMemo(
    () =>
      scaleLinear({
        range: [width, 0],
        domain: [data[data.length - 1].x, data[0].x],
        nice: true,
      }),
    [data, width]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0],
        domain: [
          // eslint-disable-next-line prefer-spread
          Math.min.apply(
            Math,
            data.map((d) => d.y)
          ),
          // eslint-disable-next-line prefer-spread
          Math.max.apply(
            Math,
            data.map((d) => d.y)
          ),
        ],
        nice: true,
      }),
    [data, height]
  );
  
  return (
    <div className={`${className} ${styles.wavyCurve}`} ref={ref}>
      <motion.svg width={width} height={height}>
        <LinePath
          data={data}
          x={(d) => xScale(d.x) ?? 0}
          y={(d) => yScale(d.y) ?? 0}
          curve={curveBasisOpen}
          strokeWidth={2}
          strokeOpacity={0.8}
          strokeLinecap="round"
          fill="none"
          stroke="#5b5cf0"
        />
      </motion.svg>
    </div>
  );
};