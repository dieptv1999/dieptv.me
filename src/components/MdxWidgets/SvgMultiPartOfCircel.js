import styles from './MdxWidgets.module.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from 'components/ThemeProvider';
import Image from 'next/image';

export const SvgMultiPartOfCircel = () => {
    const {themeId} = useTheme();
    const [count, setCount] = useState(0);

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
            const delay = 1 + i * 0.5;
            return {
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    };

    return (
        <div>
            <motion.svg
                height={500}
                width={500}
                key={`${count}_svg_multi_part_circle`}
            >
                <motion.path
                    d="M 5,250 A 245 245 0 1 1 495,250"
                    stroke="#000080"
                    fill={'transparent'}
                    strokeWidth={6}
                    variants={draw}
                    custom={0}
                />
            </motion.svg>
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
                    <Image src={'/static/refresh.svg'} width={30} height={30} className={styles.refresh} alt={'refresh'} />
                </motion.div>
        </div>
    );
};