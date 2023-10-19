import styles from './MdxWidgets.module.css';
import Image from 'next/image';
import {m} from 'framer-motion';
import { useRouter } from 'next/router';

export const NextPost = ({ name, description, time = '-1', path = '/'}) => {
  const router = useRouter();

  return (
    <m.div
      className={styles.nextPost}
      whileHover={{
        scale: 1.07
      }}
      whileTap={{
        scale: 0.97
      }}
      onClick={() => router.push(path)}
    >
      <div style={{
        marginRight: 8,
        flex: 1,
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: '600',
          fontSize: 20,
        }}>
          <div style={{
            flex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>{name}</div>
          <div style={{
            fontSize: 16,
          }}>{time === '-1' ? 'Upcoming' : time}</div>
        </div>
        <div style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontSize: 14,
        }}>{description}</div>
      </div>
      <Image src={'/static/right-arrow-svgrepo-com.svg'} width={40} height={40} alt={'arrow-right'} />
    </m.div>
  );
};