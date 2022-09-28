import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { curveBasisOpen } from '@visx/curve';
import useDimensions from '../../hooks/useDimensions';
import styles from './MdxWidgets.module.css';
import Image from 'next/image';
import { useTheme } from '../ThemeProvider';

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

export const SpringAnimationDamping = ({ className = '', withDamping = false }) => {
  const [stiffness, setStiffness] = useState(20);
  const [damping, setDamping] = useState(withDamping ? 0.3 : 0);
  const [mass, setMass] = useState(1);
  const [frameRate, setFrameRate] = useState(0);
  const ref = useRef();
  const { width, height } = useDimensions(ref);
  const [count, setCount] = useState(0);
  const {themeId} = useTheme();

  const initialData = getPoints(stiffness, mass, damping);
  const [data, setData] = useState(initialData);

  const xScale = useMemo(
    () =>
      scaleLinear({
        range: [width, 0],
        domain: [data[data.length - 1].x, data[0].x],
        nice: true,
      }),
    [data, width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0],
        domain: [
          // eslint-disable-next-line prefer-spread
          Math.min.apply(
            Math,
            data.map((d) => d.y),
          ),
          // eslint-disable-next-line prefer-spread
          Math.max.apply(
            Math,
            data.map((d) => d.y),
          ),
        ],
        nice: true,
      }),
    [data, height],
  );

  useEffect(() => {
    setData(getPoints(stiffness, mass, damping));
    setCount(count + 1);
  }, [mass, stiffness, damping]);

  return (
    <div className={`${className}`} data-theme={themeId}>
      <div style={{ display: 'inline-flex' }}>
        <div>Stiffness: {stiffness} |</div>
        <div style={{ marginLeft: 5 }}>Damping: {damping} |</div>
        <div style={{ marginLeft: 5 }}>Mass: {mass} |</div>
        <div style={{ marginLeft: 5 }}>Framerate: 60fps</div>
      </div>
      <div ref={ref} className={styles.wavyCurve}>
        <motion.svg width={width} height={height}>
          <LinePath
            data={data}
            x={(d) => xScale(d.x) ?? 0}
            y={(d) => yScale(d.y) ?? 0}
            curve={curveBasisOpen}
            strokeWidth={2}
            strokeOpacity={0.8}
            strokeLinecap='round'
            fill='none'
            stroke='#5b5cf0'
          />
        </motion.svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
          key={count}
          style={{
            background:
              'linear-gradient(180deg, rgba(18,204,246,.55) 0%, #5b5cf0 100%)',
            height: '100px',
            width: '100px',
            borderRadius: '10px',
            marginTop: 50,
          }}
          animate={{
            rotate: 180,
            y: -20,
            borderRadius: '50%',
          }}
          transition={{
            type: 'spring',
            stiffness,
            mass,
            damping: damping,
          }}
        />
      </div>
      {withDamping && <div>
        <motion.div
          // whileTap={{ scale: 0.95 }}
          style={{
            padding: 3,
            borderRadius: 5,
            cursor: 'pointer',
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            height: 'fit-content',
            backgroundColor: themeId === 'dark' ? 'white' : 'transparent',
          }} onClick={() => setCount(count + 1)}>
          <Image src={'/static/refresh.svg'} width={30} height={30} className={styles.refresh} alt={'refresh'}/>
        </motion.div>
      </div>}
    </div>
  );
};