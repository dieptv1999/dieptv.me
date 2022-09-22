import { CubicBezierVisualizer } from 'components/CubicBezierVisualizer';
import { NextSeo } from 'next-seo';
import styles from './Shadows.module.css';
import {
  globalStyles,
  Tooltip,
  ThemeProvider,
} from '@maximeheckel/design-system';
import { Range } from 'react-range';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

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

export const Shadows = () => {
  globalStyles();
  const [layers, setLayers] = useState([6]);
  const [blur, setBlur] = useState([80]);
  const [blurValues, setBlurValues] = useState(new Array(layers).fill(0));
  const [transparency, setTransparency] = useState([0.07]);
  const [transparencyValues, setTransparencyValues] = useState(new Array(layers).fill(0));
  const [copied, setCopied] = useState(false);
  const [reduceSpread, setReduceSpread] = useState([0]);
  const [horizontal, setHorizontal] = useState([100]);
  const [vertical, setVertical] = useState([100]);
  const [dimensionValues, setDimensionValues] = useState(new Array(layers).fill(0));

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

  const cssStr = useMemo(() => new Array(layers[0]).fill(0).map((_, i) => `${(horizontal * dimensionValues[layers[0] - i - 1]).toFixed(0) || 0}px ${(vertical * dimensionValues[layers[0] - i - 1]).toFixed(0) || 0}px ${(blur * blurValues[layers[0] - i - 1]).toFixed(0) || 0}px ${reduceSpread ? `${reduceSpread || 0}px` : ''} rgb(0 0 0 / ${(transparency * transparencyValues[i] * 100).toFixed(0) || 0}%)${i === layers[0] - 1 ? '' : ','}`).join('\n'),
    [layers, blur, blurValues, transparencyValues, transparency, dimensionValues, horizontal, vertical, reduceSpread]);

  return (
    <div className={styles.container}>
      <NextSeo
        title={'CSS Shadows generator'}
        description={'Create a CSS Shadows snippet for your frontend project'}
        canonical='https://www.techlens.tech/'
        openGraph={{
          url: 'https://www.techlens.tech/shadows/',
          title: 'CSS Shadows generator',
          description: 'Create a CSS Shadows snippet for your frontend project',
          images: [
            {
              url: 'https://i.ibb.co/ysxmnG5/Screenshot-2022-09-22-163741.png',
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
      <ThemeProvider>
        <Tooltip.Provider>
          <div className={styles.containerInner}>
            <div className={styles.containerContent}>
              <div className={styles.content}>
                <div className={styles.content3}>
                  <pre
                    style={{
                      padding: 25,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      boxShadow: `
                      ${cssStr}
                      `,
                    }}
                  >
                    <div className={styles.codeValues}>box-shadow:</div>
                    {new Array(layers[0]).fill(1).map((_, i) => {
                      return (
                        <div className={styles.codeValues} key={`${i}`}>
                          <div
                            className={styles.codeHighlight}> {(horizontal * dimensionValues[layers - i - 1]).toFixed(1)}</div>
                          px
                          <div
                            className={styles.codeHighlight}> {(vertical * dimensionValues[layers - i - 1]).toFixed(1)}</div>px
                          <div
                            className={styles.codeHighlight}> {(blur * blurValues[layers - i - 1]).toFixed(1)}</div>px
                          <div
                            className={styles.codeHighlight}> {reduceSpread}</div>px
                          rgba(0, 0, 0, <div
                          className={styles.codeHighlight}>{(transparency * transparencyValues[i]).toFixed(2)}</div>),
                        </div>
                      );
                    })}
                    ;
                      </pre>
                  {copied === true && <div className={styles.copied} onClick={() => setCopied(false)}>Copied!</div>}
                </div>
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
                  <div className={styles.labelValues}>layers of shadows</div>
                  <div>{layers}</div>
                </div>
                <Range
                  step={1}
                  min={1}
                  max={20}
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
                <div className={styles.containerLabel} style={{ marginTop: 13 }}>
                  <div className={styles.labelValues}>reduce spread</div>
                  <div>{reduceSpread}</div>
                </div>
                <Range
                  step={1}
                  min={-100}
                  max={0}
                  values={reduceSpread}
                  onChange={(values) => setReduceSpread(values)}
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
            <div className={styles.containerEditCubic}>
              <div className={styles.containerValues}>
                <div className={styles.containerLabel}>
                  <div className={styles.labelValues}>blur</div>
                  <div>{blur}</div>
                </div>
                <Range
                  step={1}
                  min={0}
                  max={500}
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
                <CubicBezierVisualizer key='cubic_blur' editable={true} layers={layers} onChange={({ data, speed }) => {
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
                <CubicBezierVisualizer key='cubic_transparency' editable={true} layers={layers}
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
                  max={500}
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
                  max={500}
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
                <CubicBezierVisualizer key='cubic_dimension' editable={true} layers={layers}
                                       onChange={({ data, speed }) => {
                                         setDimensionValues(data.map(d => d?.y));
                                       }} />
              </div>
            </div>
          </div>
        </Tooltip.Provider>
      </ThemeProvider>
    </div>
  );
};