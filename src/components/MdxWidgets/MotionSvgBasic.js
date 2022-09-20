import styles from './MdxWidgets.module.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from 'components/ThemeProvider';
import Image from 'next/image';

export const MotionSvgBasic = ({ type = 'line' }) => {
    const { themeId } = useTheme();
    const [count, setCount] = useState(0);

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
            const delay = 1 + i * 0.5;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    };

    useEffect(() => {
        setCount(count + 1);
    }, [themeId]);

    return (
        <div className={styles.motionSvgBasic}>
            {type !== 'path' ? <motion.svg
                width="600"
                height="300"
                viewBox="0 0 600 300"
                initial="hidden"
                animate="visible"
                key={`${count}_basic_svg`}
            >
                {type === 'line' && <motion.line
                    x1="120"
                    y1="15"
                    x2="460"
                    y2="270"
                    stroke="#00cc88"
                    strokeWidth={6}
                    variants={draw}
                    custom={0}
                />}

                {type === 'circle' && <motion.circle
                    cx="300"
                    cy="150"
                    r="110"
                    stroke="yellow"
                    fill={'transparent'}
                    strokeWidth={6}
                    variants={draw}
                    custom={1}
                />}

                {type === 'ellipse' && <motion.ellipse
                    cx="300"
                    cy="150"
                    rx={80}
                    ry={110}
                    stroke="red"
                    fill={'transparent'}
                    strokeWidth={6}
                    variants={draw}
                    custom={0}
                />}


                {/* ----------------------------polygon ---------------------------------- */}
                {type === 'polygon' && <motion.polygon
                    points="150,300 300,100 300,200 450,0"
                    stroke="purple"
                    fill={'transparent'}
                    strokeWidth={6}
                    variants={draw}
                    custom={0}
                />}
                {type === 'polygon' && <motion.text
                    x={150}
                    y={300}
                    style={{ fill: themeId === 'dark' ? 'white' : 'black' }}
                >1</motion.text>}
                {type === 'polygon' && <motion.text
                    x={300}
                    y={100}
                    style={{ fill: themeId === 'dark' ? 'white' : 'black' }}
                >2</motion.text>}
                {type === 'polygon' && <motion.text
                    x={300}
                    y={200}
                    style={{ fill: themeId === 'dark' ? 'white' : 'black' }}
                >3</motion.text>}
                {type === 'polygon' && <motion.text
                    x={450}
                    y={20}
                    style={{ fill: themeId === 'dark' ? 'white' : 'black' }}
                >4</motion.text>}
                {/* ----------------------------polygon ---------------------------------- */}
            </motion.svg>
                : <motion.svg viewBox="0 0 340 333">

                    <motion.path
                        class="path"
                        fill="transparent"
                        stroke="#50C878"
                        stroke-width="4"
                        strokeDasharray={[20]}
                        strokeDashoffset={[0]}
                        transition={{
                            type: 'spring',
                            repeat: Infinity,
                            duration: 10,
                        }}
                        animate={{
                            strokeDashoffset: [1000, 0]
                        }}
                        d={["M66.039,133.545c0,0-21-57,18-67s49-4,65,8 s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41 C46.039,146.545,53.039,128.545,66.039,133.545z",
                            "M66.039,133.545c0,0-21-57,18-67s49-4,65,8 s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41 C46.039,146.545,53.039,128.545,66.039,133.545z"]}
                    />

                </motion.svg>}
            <div>
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
        </div>
    );
};