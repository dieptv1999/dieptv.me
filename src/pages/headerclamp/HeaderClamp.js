import styles from './HeaderClamp.module.scss';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { Range } from 'react-range';
import { useState } from 'react';
import { tokens, useTheme } from '../../components/ThemeProvider';
import { Input } from '../../components/Input';
import { cssProps, msToNum, numToMs } from '../../utils/style';
import { useFormInput } from '../../hooks';
import dynamic from 'next/dynamic';
import { ShareComponent } from '../../components/ShareComponent';
import { useRouter } from 'next/router';

const FontPicker = dynamic(() => import('font-picker-react'), { ssr: false });

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

export const HeaderClamp = () => {
  const { themeId } = useTheme();
  const { asPath } = useRouter();
  const [responsive, setResponsive] = useState([700]);
  const [step, setStep] = useState([6]);
  const [activeFontFamily, setActiveFontFamily] = useState('Lato');
  const initDelay = tokens.base.durationS;
  const [copied, setCopied] = useState(false);
  const valuesText = useFormInput('This text is the preview text');

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

  const cssStr = `
  h1 {
font-size: clamp(${1.063 + 0.212 * step}rem, calc( 12px + ${1.375 + 0.275 * step}vw ), ${1.438 + 0.287 * step}rem);
line-height: 1.1;
}

h2 {
font-size: clamp(${0.875 + 0.175 * step}rem, calc( 12px + ${1 + 0.2 * step}vw ), ${1.125 + 0.220 * step}rem);
line-height: 1.1;
}

h3 {
font-size: clamp(${0.713 + 0.142 * step}rem, calc( 12px + ${0.750 + 0.15 * step}vw ), ${0.938 + 0.187 * step}rem);
line-height: 1.1;
}

h4 {
font-size: clamp(${0.625 + 0.125 * step}rem, calc( 12px + ${0.5 + 0.1 * step}vw ), ${0.75 + 0.15 * step}rem);
line-height: 1.1;
}

p {
font-size: clamp(${0.575 + 0.115 * step}rem, calc( 12px + ${0.300 + 0.06 * step}vw ), ${0.625 + 0.125 * step}rem);
line-height: 1.1;
}

  `;

  return (
    <div className={styles.container}>
      <NextSeo
        title={'Header Clamp Generator'}
        description={'Create a header CSS Clamp function snippet for your frontend project'}
        canonical='https://www.techlens.tech/'
        openGraph={{
          url: 'https://www.techlens.tech/headerclamp/',
          title: 'Header Clamp Generator',
          description: 'Create a header CSS Clamp function snippet for your frontend project',
          images: [
            {
              url: 'https://i.ibb.co/RHnKjPY/Screenshot-from-2022-09-27-13-34-14.png',
              width: 1851,
              height: 945,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: 'Header Clamp Generator',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className={styles.content}>
        <div
          className={styles.content2}
          style={{
            backgroundColor: themeId === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)',
            width: responsive[0],
          }}
        >
          <div className={styles.headerContent}>
            <div className={styles.circleAction}
                 style={{ backgroundColor: '#ff453a', marginRight: '0.75rem', marginLeft: '1rem' }}></div>
            <div className={styles.circleAction} style={{ backgroundColor: '#ff9b0a', marginRight: '0.75rem' }}></div>
            <div className={styles.circleAction} style={{ backgroundColor: '#34d158', marginRight: '0.75rem' }}></div>
          </div>
          <div className={styles.content3}>
            <div className={styles.h1Container}>
              <div className={styles.label}>H1</div>
              <motion.h1
                whileHover={{ translateX: 20 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                }}
                className={`${styles.h1Content} apply-font`}
                style={{
                  fontSize: `clamp(${1.063 + 0.212 * step}rem, calc( 12px + ${1.375 + 0.275 * step}vw ), ${1.438 + 0.287 * step}rem)`,
                }}
              >{valuesText.value}
              </motion.h1>
            </div>
            <div className={styles.h1Container}>
              <div className={styles.label}>H2</div>
              <motion.h2
                whileHover={{ translateX: 20 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                }}
                className={`${styles.h1Content} apply-font`}
                style={{
                  fontSize: `clamp(${0.875 + 0.175 * step}rem, calc( 12px + ${1 + 0.2 * step}vw ), ${1.125 + 0.220 * step}rem)`,
                }}
              >{valuesText.value}
              </motion.h2>
            </div>
            <div className={styles.h1Container}>
              <div className={styles.label}>H3</div>
              <motion.h3
                whileHover={{ translateX: 20 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                }}
                className={`${styles.h1Content} apply-font`}
                style={{
                  fontSize: `clamp(${0.713 + 0.142 * step}rem, calc( 12px + ${0.750 + 0.15 * step}vw ), ${0.938 + 0.187 * step}rem)`,
                }}
              >{valuesText.value}
              </motion.h3>
            </div>
            <div className={styles.h1Container}>
              <div className={styles.label}>H4</div>
              <motion.h4
                whileHover={{ translateX: 20 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                }}
                className={`${styles.h1Content} apply-font`}
                style={{
                  fontSize: `clamp(${0.625 + 0.125 * step}rem, calc( 12px + ${0.5 + 0.1 * step}vw ), ${0.75 + 0.15 * step}rem)`,
                }}
              >{valuesText.value}
              </motion.h4>
            </div>
            <div className={styles.h1Container}>
              <div className={styles.label}>P</div>
              <motion.p
                whileHover={{ translateX: 20 }}
                transition={{
                  duration: 1,
                  type: 'spring',
                }}
                className={`${styles.h1Content} apply-font`}
                style={{
                  fontSize: `clamp(${0.575 + 0.115 * step}rem, calc( 12px + ${0.300 + 0.06 * step}vw ), ${0.625 + 0.125 * step}rem)`,
                }}
              >{valuesText.value}
              </motion.p>
            </div>
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
        <div className={styles.note}>Use CSS function clamp for header style</div>
      </div>
      <div
        className={`${styles.containerSelect} ${themeId === 'dark' ? 'fontPickerDark' : 'fontPickerLight'}`}
        style={{
          backgroundColor: themeId === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <div className={styles.containerInput}>
          <Input
            required
            className={styles.input}
            data-status={true}
            style={getDelay(tokens.base.durationXS, initDelay)}
            label='Text preview'
            maxLength={30}
            {...valuesText}
          />
        </div>
        {/*------------------------------ font---------------------*/}
        <div className={styles.containerLabel}>
          <div className={styles.labelValues}>Font Family</div>
        </div>
        <FontPicker
          apiKey='AIzaSyDxn_9iBiwRdf99WHgpPdjryVC2XkTQqwM'
          className={styles.fontPicker}
          activeFontFamily={activeFontFamily}
          onChange={(nextFont) =>
            setActiveFontFamily(nextFont.family)
          }
        />
        <div className={styles.space} />
        {/*-----------------------------step-------------------------------------*/}
        <div className={styles.containerLabel}>
          <div className={styles.labelValues}>step</div>
          <div>{step} / 10</div>
        </div>
        <Range
          step={1}
          min={1}
          max={10}
          values={step}
          onChange={(values) => setStep(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                borderRadius: 4,
                backgroundColor: themeId === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)',
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
                background: themeId === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                border: `2px solid ${themeId === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                borderRadius: 22,
              }}
            />
          )}
        />
        <div className={styles.space} />
        {/*-----------------------------------responsive ---------------------------------------*/}
        <div className={styles.containerLabel}>
          <div className={styles.labelValues}>responsive</div>
          <div>{responsive}px</div>
        </div>
        <Range
          step={1}
          min={300}
          max={800}
          disabled={typeof window !== 'undefined' && window.innerWidth < 1000}
          values={responsive}
          onChange={(values) => setResponsive(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                width: '100%',
                borderRadius: 4,
                backgroundColor: themeId === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)',
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
                background: themeId === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                border: `2px solid ${themeId === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                borderRadius: 22,
              }}
            />
          )}
        />
        <div className={styles.space} />
        <div className={styles.containerLabel}>
          <div className={styles.labelValues}>Share on</div>
        </div>
        <ShareComponent url={`https://techlens.tech${asPath}`} />
      </div>
    </div>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}