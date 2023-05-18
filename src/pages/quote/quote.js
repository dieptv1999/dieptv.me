import { ThemeProvider } from '../../components/ThemeProvider';
import styles from './quote.module.css';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

export const Quote = () => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link href='https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap'
              rel='stylesheet' />
      </Head>
      <NextSeo
        title={'The Sheltering Sky,  Paul Bowles'}
        description={'The Sheltering Sky,  Paul Bowles.'}
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
          site_name: 'The Sheltering Sky,  Paul Bowles',
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
                <div className={styles.name}>TECHLENS</div>
                <div>QUOTE</div>
              </div>
            </div>
            <div className={styles.quote}>
              Bởi chúng ta không biết bao giờ mình sẽ chết, ta cứ ngỡ cuộc đời là suối nguồn không thể nào vơi. Nhưng
              mọi sự chỉ đến đôi lần trong đời. Đôi lần, thật ít ỏi. Cậu sẽ còn nhớ thêm bao nhiêu lần nữa, về một buổi
              chiều đặc biệt ấy của ngày bé thơ. Một buổi chiều sẽ ăn sâu vào chính cậu, đến mức thiếu nó thì cậu chẳng
              nhận ra cuộc đời mình nữa. Chắc chỉ thêm bốn, năm bận, mà biết đâu còn không nhiều như vậy. Cậu sẽ còn có
              thêm bao nhiêu lần cậu nhìn trăng rằm lên cao? Biết đâu chỉ độ hai mươi lần, mà như thế đã xem là vô tận.
            </div>
            <div className={styles.source}>
              <p>The Sheltering Sky,&nbsp;Paul Bowles.</p>
              <p>Hôm nay, lại một ngày nữa trôi qua mà, thật vô vị</p>
              <p>Tôi lại ngồi đọc blog và nghĩ về cuộc đời mình. Đọc được trích dẫn này từ cuốn tiểu thuyết The Sheltering Sky thật hợp tâm trạng</p>
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