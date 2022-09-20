import styles from './MdxWidgets.module.css';

export const ClipPathSvg = () => {
  return (
    <div className={styles.containerClipPath}>
      <svg viewBox='0 0 100 100' height={100} width={100}>
        <clipPath id='myClip' className={styles.myClip}>
          <circle cx='40' cy='35' r='35' />
        </clipPath>

        <path
          id='heart'
          d='M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z' />

        <use clipPath='url(#myClip)' href='#heart' fill='red' />
      </svg>
    </div>
  );
};