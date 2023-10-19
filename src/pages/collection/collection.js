import styles from './Collection.module.css';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

export const Collection = () => {
  return (
    <div className={styles.containerWeather}>
      <NextSeo
        title={'Albert Einstein'}
        description={'Make everything as simple as possible, but not simpler'}
        canonical="https://www.techlens.tech/"
        openGraph={{
          url: 'https://www.techlens.tech/collection/',
          title: 'Albert Einstein',
          description: 'Make everything as simple as possible, but not simpler',
          images: [
            {
              url: 'https://i.ibb.co/HqZBsTW/Screenshot-from-2022-09-21-16-04-20.png',
              width: 1854,
              height: 947,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: 'TechLens',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Image
        layout={'fill'} objectFit={'cover'} alt={'weather backgorund'}
        src={'https://i.ibb.co/KhGyj9W/grasses-1939673.jpg'}
        quality={100}
        priority={true}
      />
      <div className={styles.containerContent}>
        <div className={styles.content}>
          <div className={styles.saying}>“Make everything as simple as possible, but not simpler.”</div>
          <div className={styles.authorContainer}>
            <Image
              src='https://i.ibb.co/bJsRrjj/albert-einstein-by-zuzahin-d5pcbug-1500601954897.webp'
              width={28}
              height={28}
              className={styles.authorAvatar}
              objectFit={'cover'}
            />
            <div className={styles.authorStart}>{`//`}</div>
            <div className={styles.author}>Albert Einstein</div>
          </div>
        </div>
      </div>
    </div>
  );
};