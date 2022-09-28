import styles from './ShareComponent.module.scss';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

export const ShareComponent = ({ type = '', title = '', url = '' }) => {
  return (
    <div className={styles.container}>
      <TwitterShareButton
        title={title || 'Discover this new type scale generator using clamp css property on'}
        hashtags={['css', 'clmap']}
        url={url}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <div className={styles.space}/>
      <TelegramShareButton
        title={title || 'Discover this new type scale generator using clamp css property on'}
        url={url}
      >
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
      <div className={styles.space}/>
      <FacebookShareButton
        quote={title || 'Discover this new type scale generator using clamp css property on'}
        hashtag={'#clamp'}
        url={url}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
    </div>
  );
};