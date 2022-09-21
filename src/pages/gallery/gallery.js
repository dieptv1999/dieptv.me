import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.css';

export const Gallery = () => {
    const numColors = 3;
    const colors = ['rgba(255,0,255,0.3)', 'rgba(0,255,255,0.3)', 'rgba(255,255,0,0.3)'];

    const [index, setIndex] = useState(false);
    const [head, setHead] = useState(0);
    const itemsRef = useRef([]);

    const scroll = (childRef, topPosition = 100) => {
        if (childRef && topPosition) {
            const { y } = childRef.getBoundingClientRect();

            console.log(y, 'scroll');

            childRef.scrollTo(y, topPosition);

        }
    };

    // useEffect(() => {
    //     itemsRef.current = itemsRef.current.slice(0, props.items.length);
    //  }, [props.items]);

    return (
        <div className={styles.gallery}>
            <NextSeo
                title={'Gallery'}
            />
            <AnimateSharedLayout>
                <div className={styles.container}>
                    <ul className={styles.galleryContainer}>
                        {colors.map((color, i) => (
                            <motion.li
                                className={styles.galleryItem}
                                key={color}
                                ref={el => itemsRef.current[i] = el}
                                onClick={() => setIndex(i)}
                                style={{ backgroundColor: color }}
                                layoutId={color}
                            />
                        ))}
                    </ul>
                    <div className={styles.arrowContainer}>
                    </div>
                </div>
                <AnimatePresence>
                    {index !== false && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key="overlay"
                            className={styles.overlay}
                            onClick={() => setIndex(false)}
                        />
                    )}

                    {index !== false && (
                        <div className={styles.singleImageContainer} onClick={() => setIndex(false)}>
                            <motion.div
                                layoutId={colors[index]}
                                className={styles.singleImage}
                                style={{ backgroundColor: colors[index] }}
                            />
                        </div>
                    )}
                </AnimatePresence>
            </AnimateSharedLayout>
        </div>
    );
};