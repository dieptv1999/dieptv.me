import { CubicBezierVisualizer } from 'components/CubicBezierVisualizer';
import { NextSeo } from 'next-seo';
import styles from './TextShadows.module.css';
import {
  globalStyles,
  Tooltip,
  ThemeProvider,
} from '@maximeheckel/design-system';
import { Range } from 'react-range';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from 'components/Input';
import { tokens } from '../../components/ThemeProvider';
import { useFormInput } from '../../hooks';
import { cssProps, msToNum, numToMs } from '../../utils/style';
import { SketchPicker } from 'react-color';
import Popup from 'reactjs-popup';

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
    let successful = document.execCommand('copy');
    let msg = successful ? 'successful' : 'unsuccessful';
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

export const TextShadows = () => {
  globalStyles();
  const [layers, setLayers] = useState([4]);
  const [blur, setBlur] = useState([6]);
  const [blurValues, setBlurValues] = useState(new Array(layers).fill(0));
  const [transparency, setTransparency] = useState([0.5]);
  const [transparencyValues, setTransparencyValues] = useState(new Array(layers).fill(0));
  const [copied, setCopied] = useState(false);
  const [reduceSpread, setReduceSpread] = useState([0]);
  const [color, setColor] = useState('#000000');
  const [horizontal, setHorizontal] = useState([10]);
  const [vertical, setVertical] = useState([10]);
  const [dimensionValues, setDimensionValues] = useState(new Array(layers).fill(0));
  const valuesText = useFormInput('This text is the preview text');
  const initDelay = tokens.base.durationS;

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

  const cssStr = useMemo(() => new Array(layers[0]).fill(0).map((_, i) => `rgb(${hexToRgb(color)?.r} ${hexToRgb(color)?.g} ${hexToRgb(color)?.b} / ${(transparency * transparencyValues[i] * 100).toFixed(0) || 0}%) ${(horizontal * dimensionValues[layers[0] - i - 1]).toFixed(0) || 0}px ${(vertical * dimensionValues[layers[0] - i - 1]).toFixed(0) || 0}px ${(blur * blurValues[layers[0] - i - 1]).toFixed(0) || 0}px ${i === layers[0] - 1 ? '' : ','}`).join('\n'),
    [layers, blur, blurValues, transparencyValues, transparency, dimensionValues, horizontal, vertical, color]);

  return (
    <div className={styles.container}>
      <NextSeo
        title={'CSS Text Shadows generator'}
        description={'Create a CSS Text Shadows snippet for your frontend project'}
        canonical='https://www.techlens.tech/'
        openGraph={{
          url: 'https://www.techlens.tech/textshadows/',
          title: 'CSS Text Shadows generator',
          description: 'Create a CSS Text Shadows snippet for your frontend project',
          images: [
            {
              url: 'https://i.ibb.co/pK2V3Vn/Screenshot-2022-09-24-161153.png',
              width: 1919,
              height: 933,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: 'Text Shadows generator',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <ThemeProvider>
        <Tooltip.Provider>
          <div className={styles.containerInner}>
            <div className={styles.containerContent}>
              <div className={styles.content}>
                <div className={styles.content4} style={{
                  textShadow: `
                      ${cssStr}
                      `,
                }}>{valuesText.value}
                </div>
              </div>
              <div className={styles.containerInput}>
                <Input
                  required
                  className={styles.input}
                  data-status={true}
                  style={getDelay(tokens.base.durationXS, initDelay)}
                  label='Text preview'
                  maxLength={40}
                  {...valuesText}
                />
              </div>
              <div className={styles.content3}>
                  <pre
                    style={{
                      padding: 25,
                      backgroundColor: 'white',
                      borderRadius: 10,
                    }}
                  >
                    <div className={styles.codeValues}>text-shadow:</div>
                    {new Array(layers[0]).fill(1).map((_, i) => {
                      return (
                        <div className={styles.codeValues} key={`${i}_show_values`}>
                          rgba({hexToRgb(color)?.r}, {hexToRgb(color)?.g}, {hexToRgb(color)?.b}, <div
                          className={styles.codeHighlight}>{(transparency * transparencyValues[i]).toFixed(2)}</div>)
                          <div
                            className={styles.codeHighlight}> {(horizontal * dimensionValues[layers - i - 1]).toFixed(1)}</div>
                          px
                          <div
                            className={styles.codeHighlight}> {(vertical * dimensionValues[layers - i - 1]).toFixed(1)}</div>px
                          <div
                            className={styles.codeHighlight}> {(blur * blurValues[layers - i - 1]).toFixed(1)}</div>px,
                        </div>
                      );
                    })}
                    ;
                      </pre>
                {copied === true && <div className={styles.copied} onClick={() => setCopied(false)}>Copied!</div>}
              </div>
              <motion.div
                onClick={() => copyTextToClipboard(cssStr)}
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
              <div className={styles.content2}>
                <div className={styles.containerLabel}>
                  <div className={styles.labelValues}>color</div>
                  <Popup trigger={<div className={styles.selectColor} style={{
                    background: color,
                  }}></div>} position='left bottom'>
                    <SketchPicker
                      color={color}
                      disableAlpha={true}
                      onChangeComplete={(val) => setColor(val.hex)}
                    />
                  </Popup>
                </div>
              </div>
            </div>
            <div className={styles.containerEditCubic}>
              <div className={styles.containerValues}>
                <div className={styles.containerLabel}>
                  <div className={styles.labelValues}>blur</div>
                  <div>{blur}</div>
                </div>
                <Range
                  step={1}
                  min={0}
                  max={50}
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
                        background: 'hsla(0,0%,100%,.9)',
                        border: '2px solid hsla(0,0%,100%,.4)',
                        borderRadius: 22,
                      }}
                    />
                  )}
                />
                <CubicBezierVisualizer key='cubic_blur_text' editable={true} layers={layers}
                                       onChange={({ data, speed }) => {
                                         setBlurValues(data.map(d => d?.y));
                                       }} />
              </div>
              <div className={styles.containerValues}>
                <div className={styles.containerLabel}>
                  <div className={styles.labelValues}>transparency</div>
                  <div>{transparency}</div>
                </div>
                <Range
                  step={0.01}
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
                        background: 'hsla(0,0%,100%,.9)',
                        border: '2px solid hsla(0,0%,100%,.4)',
                        borderRadius: 22,
                      }}
                    />
                  )}
                />
                <CubicBezierVisualizer key='cubic_transparency_text' editable={true} layers={layers}
                                       onChange={({ data, speed }) => {
                                         setTransparencyValues(data.map(d => d?.y));
                                       }} />
              </div>
              <div className={styles.containerValues}>
                <div className={styles.containerLabel}>
                  <div className={styles.labelValues}>horizontal scale</div>
                  <div>{horizontal}px</div>
                </div>
                <Range
                  step={1}
                  min={0}
                  max={50}
                  values={horizontal}
                  onChange={(values) => setHorizontal(values)}
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
                        background: 'hsla(0,0%,100%,.9)',
                        border: '2px solid hsla(0,0%,100%,.4)',
                        borderRadius: 22,
                      }}
                    />
                  )}
                />
                <div className={styles.containerLabel} style={{ marginTop: 13 }}>
                  <div className={styles.labelValues}>vertical scale</div>
                  <div>{vertical}px</div>
                </div>
                <Range
                  step={1}
                  min={0}
                  max={50}
                  values={vertical}
                  onChange={(values) => setVertical(values)}
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
                        background: 'hsla(0,0%,100%,.9)',
                        border: '2px solid hsla(0,0%,100%,.4)',
                        borderRadius: 22,
                      }}
                    />
                  )}
                />
                <CubicBezierVisualizer key='cubic_dimension_text' editable={true} layers={layers}
                                       onChange={({ data, speed }) => {
                                         setDimensionValues(data.map(d => d?.y));
                                       }} />
              </div>
              <div className={styles.containerValues}>
                <div className={styles.containerLabel}>
                  <div className={styles.labelValues}>layers of shadows</div>
                  <div>{layers}</div>
                </div>
                <Range
                  step={1}
                  min={1}
                  max={10}
                  values={layers}
                  onChange={(values) => setLayers(values)}
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
                        background: 'hsla(0,0%,100%,.9)',
                        border: '2px solid hsla(0,0%,100%,.4)',
                        borderRadius: 22,
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </Tooltip.Provider>
      </ThemeProvider>
    </div>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
