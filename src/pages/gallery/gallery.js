import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useRef, useState } from 'react';
import styles from './Gallery.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Gallery = () => {
  const colors = [{
    color: 'rgba(255,0,255,0.3)',
    colorMain: 'rgba(255,0,255,1)',
    name: 'Glassmorphism',
    image: 'https://i.ibb.co/kMTCLvp/Screenshot-from-2022-09-21-19-50-38.png',
    description: 'Create a Glassmorphism CSS snippet for your frontend project',
    url: '/glassmorphism',
  }, {
    color: 'rgba(0,255,255,0.3)',
    colorMain: 'rgba(0,255,255,1)',
    name: 'CSS Shadows generator',
    image: 'https://i.ibb.co/ysxmnG5/Screenshot-2022-09-22-163741.png',
    description: 'Create a CSS Shadows snippet for your frontend project',
    url: '/shadows',
  }, {
    color: 'rgba(255,255,0,0.3)',
    colorMain: 'rgba(255,255,0,1)',
    name: 'CSS Text Shadows generator',
    image: 'https://i.ibb.co/TTQND14/Screenshot-2022-09-24-161153.png',
    description: 'Create a CSS Text Shadows snippet for your frontend project',
    url: '/textshadows',
  }, {
    color: 'rgba(0, 127, 255,0.3)',
    colorMain: 'rgba(255,255,0,1)',
    name: 'Header Clamp Generator',
    image: 'https://i.ibb.co/RHnKjPY/Screenshot-from-2022-09-27-13-34-14.png',
    description: 'Create a header CSS Clamp function snippet for your frontend project',
    url: '/headerclamp',
  }];

  const router = useRouter();

  const [index, setIndex] = useState(false);
  const [head, setHead] = useState(0);
  const itemsRef = useRef([]);

  const scroll = (childRef, topPosition = 100) => {
    if (childRef && topPosition) {
      const { y } = childRef.getBoundingClientRect();

      childRef.scrollTo(y, topPosition);

    }
  };

  // useEffect(() => {
  //     itemsRef.current = itemsRef.current.slice(0, props.items.length);
  //  }, [props.items]);

  return (
    <div className={styles.gallery}>
      <NextSeo
        title={'Tool for frontend'}
      />
      <AnimateSharedLayout>
        <div className={styles.container}>
          <ul className={styles.galleryContainer}>
            {colors.map((color, i) => (
              <motion.li
                className={styles.galleryItem}
                key={color.color}
                ref={el => itemsRef.current[i] = el}
                onClick={() => setIndex(i)}
                style={{ backgroundColor: color.color }}
                layoutId={color.color}
              >
                <div className={styles.title}>{color.name}</div>
                <div className={styles.containerImage}>
                  <Image
                    className={``}
                    objectFit={'cover'}
                    src={color.image}
                    layout={'fill'}
                    alt='The layers sidebar design, now with user profiles.'
                  />
                </div>
                <motion.div className={styles.button}
                            whileHover={{
                              scale: 1.04,
                            }}
                            whileTap={{
                              scale: 0.96,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(color.url);
                            }}>Go to project
                </motion.div>
                <div className={styles.desc}>{color.description}</div>
              </motion.li>
            ))}
          </ul>
        </div>
        <AnimatePresence>
          {index !== false && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key='overlay'
              className={styles.overlay}
              onClick={() => setIndex(false)}
            />
          )}

          {index !== false && (
            <div className={styles.singleImageContainer} onClick={() => setIndex(false)}>
              <motion.div
                layoutId={colors[index].color}
                className={styles.singleImage}
                style={{ backgroundColor: colors[index].colorMain }}
              >
                <div className={styles.uses}></div>
                <div className={styles.contentMain}>
                  <div className={styles.title}>{colors[index].name}</div>
                  <div className={styles.containerImage}>
                    {colors[index].image && <Image
                      className={``}
                      src={colors[index].image}
                      objectFit={'cover'}
                      layout={'fill'}
                      alt='The layers sidebar design, now with user profiles.'
                    />}
                  </div>
                  <motion.div className={styles.button}
                              whileHover={{
                                scale: 1.04,
                              }}
                              whileTap={{
                                scale: 0.96,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(colors[index].url);
                              }}>Go to project
                  </motion.div>
                  <div className={styles.desc}>{colors[index].description}</div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};