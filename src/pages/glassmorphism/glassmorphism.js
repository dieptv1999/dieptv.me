import { GlassmorphismComponent } from 'components/Glassmorphism';
import { useWindowSize } from 'hooks';
import { NextSeo } from 'next-seo';
import styles from './Glassmorphism.module.css';
import { Range } from 'react-range';
import { useMemo, useState } from 'react';
import { SketchPicker } from 'react-color';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const minComp = 140;
const maxComp = 270;

export const Glassmorphism = () => {
    const { h, w } = useWindowSize();
    const [values, setValues] = useState([50])

    const glsComponents = useMemo(() => [...Array(10).keys()].map(i => (
        <GlassmorphismComponent
            key={`glassmorphism_${i}`}
            height={getRandomIntInclusive(minComp, maxComp)}
            width={getRandomIntInclusive(minComp, maxComp)}
            transparentcy={0.1}
            blur={0.5}
            color={'white'}
            x={getRandomIntInclusive(50, w - 50)}
            y={getRandomIntInclusive(50, h - 50)}
            deg={getRandomIntInclusive(0, 70)}
        />
    )), [])

    return (
        <div className={styles.container}>
            <NextSeo
                title={'Glassmorphism'}
            />
            <div className={styles.contentTitle}>
                glassmorphism
            </div>
            <div className={styles.containerValues}>
                <div className={styles.labelValues}>blur</div>
                <Range
                    step={0.1}
                    min={0}
                    max={100}
                    values={values}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                backgroundColor: '#ccc'
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

                {/* -------------------------------------------- transparentcy----------------------------- */}
                <div className={styles.labelValues}>transparentcy</div>
                <Range
                    step={0.1}
                    min={0}
                    max={100}
                    values={values}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                backgroundColor: '#ccc'
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
                    max={100}
                    values={values}
                    onChange={(values) => setValues(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                backgroundColor: '#ccc'
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

                {/* ----------------------------code------------------------------ */}
                <div className={styles.labelValues}>css</div>
                <div className={styles.codeValues}>/* From https://css.glass */</div>
                <div className={styles.codeValues}>background: rgba(255, 255, 255, 0.19);</div>
                <div className={styles.codeValues}>border-radius: 16px;</div>
                <div className={styles.codeValues}>box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);</div>
                <div className={styles.codeValues}>backdrop-filter: blur(1.9px);</div>
                <div className={styles.codeValues}>-webkit-backdrop-filter: blur(1.9px);</div>

                {/* ---------------------------button copy ----------------------------------------------- */}

                <div className={styles.btnCopy}>copy css to clipoard</div>
            </div>
            {glsComponents}
        </div>
    )
}