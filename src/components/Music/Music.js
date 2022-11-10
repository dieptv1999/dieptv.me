import styles from './Music.module.css';
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import { useEffect, useState } from 'react';

const playList = [
  {
    id: 1,
    img: '',
    src: 'http://a.tumblr.com/tumblr_m5e9tgdyhQ1qztmnoo1.mp3',
  },
];

export const Music = () => {
  const [src, setSrc] = useState(playList[0].src);
  const [selected, setSelected] = useState(0);
  
  useEffect(() => {
    setSrc(playList[selected].src);
  }, [selected]);

  return (
    <div className={styles.music}>
      <AudioPlayer
        autoPlay={false}
        src={src}
        onPlay={e => console.log('onPlay')}
        onClickNext={() => setSelected(selected >= playList.length - 1 ? selected + 1 : 0)}
        onEnded={() => setSelected(selected >= playList.length - 1 ? selected + 1 : 0)}
        onClickPrevious={() => setSelected(selected === 0 ? playList.length - 1 :  selected - 1)}
      />
    </div>
  );
};