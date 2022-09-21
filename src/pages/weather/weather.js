import styles from './Weather.module.css';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

export const Weather = () => {
  return (
    <div className={styles.containerWeather}>
      <NextSeo
        title={'Weather'}
      />
      <div className={styles.containerContent}>

      </div>
    </div>
  );
};