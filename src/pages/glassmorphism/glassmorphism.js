import { GlassmorphismComponent } from 'components/Glassmorphism';
import { useWindowSize } from 'hooks';
import { NextSeo } from 'next-seo';
import styles from './Glassmorphism.module.css';
import { Range } from 'react-range';
import { useMemo, useState } from 'react';
import { SketchPicker } from 'react-color';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const minComp = 140;
const maxComp = 270;

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export const Glassmorphism = () => {
  const { h, w } = useWindowSize();
  const [transparency, setTransparency] = useState([0.2]);
  const [blur, setBlur] = useState([5]);
  const [outline, setOutline] = useState([0.3]);
  const [copied, setCopied] = useState(false);
  const [color, setColor] = useState('#ffffff');

  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
      setCopied(true);
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  const position = useMemo(() => [...Array(typeof window !== 'undefined' && window?.innerWidth <= 768 ? 3 : 10).keys()]
    .map(i => ({
      x: getRandomIntInclusive(50, w - 50),
      y: getRandomIntInclusive(50, h - 50),
      deg: getRandomIntInclusive(0, 70),
      height: getRandomIntInclusive(minComp, maxComp),
      width: getRandomIntInclusive(minComp, maxComp),
    })), []);


  const glsComponents = useMemo(() => [...Array(typeof window !== 'undefined' && window?.innerWidth <= 768 ? 3 : 10).keys()]
    .map(i => (
      <GlassmorphismComponent
        key={`glassmorphism_${i}`}
        height={position[i].height}
        width={position[i].width}
        transparency={transparency}
        blur={blur}
        color={color}
        outline={outline}
        x={position[i].x}
        y={position[i].y}
        deg={position[i].deg}
      />
    )), [transparency, blur, color, outline]);

  return (
    <div className={styles.container}>
      <NextSeo
        title={'Glassmorphism generator'}
        description={'Create a Glassmorphism CSS snippet for your frontend project'}
        canonical="https://www.techlens.tech/"
        openGraph={{
          url: 'https://www.techlens.tech/glassmorphism/',
          title: 'Glassmorphism generator',
          description: 'Create a Glassmorphism CSS snippet for your frontend project',
          images: [
            {
              url: 'https://i.ibb.co/kMTCLvp/Screenshot-from-2022-09-21-19-50-38.png',
              width: 1854,
              height: 947,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: 'Glassmorphism',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className={styles.contentTitle}>
        glassmorphism
      </div>
      <div className={styles.containerValues}>
        <div className={styles.labelValues}>blur</div>
        <Range
          step={0.1}
          min={0}
          max={20}
          values={blur}
          onChange={(values) => setBlur(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '22px',
                width: '22px',
                background: 'hsla(0,0%,100%,.4)',
                border: '2px solid hsla(0,0%,100%,.4)',
                borderRadius: 22,
              }}
            />
          )}
        />
        <div className={styles.space} />

        {/* -------------------------------------------- transparency----------------------------- */}
        <div className={styles.labelValues}>transparency</div>
        <Range
          step={0.1}
          min={0}
          max={1}
          values={transparency}
          onChange={(values) => setTransparency(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '22px',
                width: '22px',
                background: 'hsla(0,0%,100%,.4)',
                border: '2px solid hsla(0,0%,100%,.4)',
                borderRadius: 22,
              }}
            />
          )}
        />
        <div className={styles.space} />

        {/* --------------------------------------------- outline ------------------------ */}
        <div className={styles.labelValues}>outline</div>
        <Range
          step={0.1}
          min={0}
          max={1}
          values={outline}
          onChange={(values) => setOutline(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '22px',
                width: '22px',
                background: 'hsla(0,0%,100%,.4)',
                border: '2px solid hsla(0,0%,100%,.4)',
                borderRadius: 22,
              }}
            />
          )}
        />
        <div className={styles.space} />

        {/*-------------------------------- color -------------------------------*/}
        <div className={styles.labelValues}>color</div>
        <Popup trigger={<div className={styles.selectColor} style={{
          background: color,
        }}></div>} position='right center'>`
          <SketchPicker
            color={color}
            disableAlpha={true}
            onChangeComplete={(val) => setColor(val.hex)}
          />
        </Popup>
        <div className={styles.space} />

        {/* ----------------------------code------------------------------ */}
        <div className={styles.labelValues}>css</div>
        <div className={styles.codeValues}>{'/* From https://css.glass */'}</div>
        <div className={styles.codeValues}>background:
          rgba({hexToRgb(color)?.r}, {hexToRgb(color)?.g}, {hexToRgb(color)?.b}, {transparency});
        </div>
        <div className={styles.codeValues}>border-radius: 16px;</div>
        <div className={styles.codeValues}>box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);</div>
        <div className={styles.codeValues}>backdrop-filter: blur({blur});</div>
        <div className={styles.codeValues}>-webkit-backdrop-filter: blur({blur});</div>
        <div className={styles.codeValues}>border: 1px solid
          rgba({hexToRgb(color)?.r}, {hexToRgb(color)?.g}, {hexToRgb(color)?.b}, {outline});
        </div>
        {/* ---------------------------button copy ----------------------------------------------- */}

        <motion.div
          onClick={() => copyTextToClipboard(`
          /* From https://dieptv.vercel.app */
background: rgba(${hexToRgb(color)?.r}, ${hexToRgb(color)?.g}, ${hexToRgb(color)?.b}, ${transparency});
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(${blur});
-webkit-backdrop-filter: blur(${blur});
border: 1px solid rgba(${hexToRgb(color)?.r}, ${hexToRgb(color)?.g}, ${hexToRgb(color)?.b}, ${outline});
        `)}
          className={styles.btnCopy}
          whileTap={{
            scale: 0.98,
          }}
          whileHover={{
            scale: 1.02,
          }}
        >
          copy css to clipoard
        </motion.div>

        {copied === true && <div className={styles.copied} onClick={() => setCopied(false)}>Copied!</div>}
      </div>
      {glsComponents}
      {typeof window !== 'undefined' && window.innerWidth <= 768 && <GlassmorphismComponent
        key={`glassmorphism_mb`}
        height={120}
        width={window.innerWidth * 2 / 3}
        transparency={transparency}
        blur={blur}
        color={color}
        outline={outline}
        x={window.innerWidth / 2 - (window.innerWidth / 3)}
        y={70}
        deg={10}
        className={styles.glsComponentMb}
      />}
    </div>
  );
};