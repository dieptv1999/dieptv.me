import { ThemeProvider } from '../../../components/ThemeProvider';
import styles from './TakashiHiraide.module.css';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

export const TakashiHiraide = () => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link href='https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap'
              rel='stylesheet' />
      </Head>
      <NextSeo
        title={'Cuộc gặp gỡ mùa hè,  Takashi Haraide'}
        description={'Cuộc gặp gỡ mùa hè,  Takashi Haraide.'}
        canonical='https://www.techlens.tech/'
        openGraph={{
          url: 'https://www.techlens.tech/quote/',
          title: 'The Sheltering Sky,  Paul Bowles.',
          description: 'The Sheltering Sky,  Paul Bowles.',
          images: [
            {
              url: 'https://i.ibb.co/ysxmnG5/Screenshot-2022-09-22-163741.png',
              width: 1854,
              height: 947,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: 'Cuộc gặp gỡ mùa hè,  Takashi Haraide',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <ThemeProvider>
        <div className={styles.containerInner}>
          <div className={styles.containerQuote}>
            <div className={styles.containerAuthor}>
              <div className={styles.avatar}>
                <div className={styles.avatarImage}>
                  <Image src={'/favicon.png?v=1'} layout={'fill'} objectFit={'cover'} />
                </div>
              </div>
              <div>
                <div className={styles.name}>CUỘC GẶP GỠ MÙA HÈ</div>
                <div>Takashi Hiraide</div>
              </div>
            </div>
            <div className={styles.quote}>
              Người ngoài có thể không hiểu tại sao chúng ta lại có thể buồn vì những điều nhỏ nhặt lâu đến thế, nhưng họ không biết rằng những điều đó lại có ý nghĩa quan trọng như thế nào đối với chúng ta.
            </div>
            <div className={styles.source}>
              <p>Cuộc gặp gỡ mùa hè,&nbsp;Takashi Hiraide.</p>
              <p>Hôm nay, lại một ngày nữa trôi qua mà, thật vô vị</p>
              <p>Tôi lại ngồi đọc blog và nghĩ về cuộc đời mình. Đọc được trích dẫn này từ cuốn tiểu thuyết <span className='text-blue-500'>Cuộc gặp gỡ mùa hè</span> thật hợp tâm trạng</p>
              <p>Lại một tuần nữa qua đi và tôi vẫn chưa làm được gì mà bản thân thấy có ích. Đời người thì có được bao nhiêu tuần như thế!</p>
              <p>Vậy nên, giữa một ngày nồm ẩm mùa đông, tôi lưu trữ lại khoảnh khoắc này của cuộc đời mình.</p>
              <p>Như một lời nhắc nhở về tương lai.</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};