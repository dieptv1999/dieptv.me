import styles from './Cv.module.scss';
import { useTheme } from '../../components/ThemeProvider';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import ChevronRight from '/public/static/chevron-right.svg';
import PhoneCall from '/public/static/phone-call.svg';
import GithubIcon from '/public/static/github-icon.svg';
import EmailIcon from '/public/static/email.svg';

export const Cv = () => {
  const { themeId } = useTheme();

  return (
    <div className={styles.container} style={{
      background: themeId === 'dark' ? 'radial-gradient(64.9% 34.2308% at 0% 0%, rgba(138, 0, 0, 0.45) 0%, rgb(0, 0, 0) 100%)'
        : 'radial-gradient(64.9% 34.2308% at 0% 0%, rgba(138, 255, 255, 0.45) 0%, rgb(255, 255, 255) 100%)',
    }}>
      <NextSeo
        title={'Tran Van Diep'}
        description={'I\'m a Full Stack developer with experience in Backend, Frontend and mobile development. Currently Software Engineer of Trustkeys and living in Hanoi.'}
        canonical="https://www.techlens.tech/"
        openGraph={{
          url: 'https://www.techlens.tech/cv/',
          title: 'Tran Van Diep',
          description: 'I\'m a Full Stack developer with experience in Backend, Frontend and mobile development. Currently Software Engineer of Trustkeys and living in Hanoi.',
          images: [
            {
              url: 'https://i.ibb.co/DDbjqDK/Screenshot-from-2022-09-28-16-07-32.png',
              width: 1851,
              height: 889,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: 'Profile',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          <Image src={'/static/sun.png'} width={66} height={66} objectFit={'cover'} />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.name}
               style={{color: themeId === 'dark' ? '#cccccc' : '#333333'}}>Tran Van Diep</div>
          <div className={styles.description}
               style={{color: themeId === 'dark' ? '#aaaaaa' : '#333333'}}>Developer</div>
        </div>
      </div>
      <div className={styles.contact}>
        <PhoneCall width={10} height={10} fill={themeId === 'dark' ? 'white' : 'black'} />
        <div className={styles.phone}>+84-339-210-372</div>
        <GithubIcon width={10} height={10} fill={themeId === 'dark' ? 'white' : 'black'} className={themeId === 'dark' ? styles.svgWhite : styles.svgBlack}/>
        <a className={styles.phone} href={'https://github.com/dieptv1999'}>dieptv1999</a>
        <EmailIcon width={10} height={10} fill={themeId === 'dark' ? 'white' : 'black'} />
        <a className={styles.phone} href={'mailto:techlensglobal@gmail.com'}>techlensglobal@gmail.com</a>
      </div>

      <div className={styles.section}>
        {/*------------------------------------------- Experience -----------------------------*/}
        <div className={styles.title}
             style={{color: themeId === 'darkId' ? 'rgba(220, 220, 220, 0.7)' : 'color: rgba(34, 34, 34, 0.7)'}}>Experience</div>
        {/*------------------------------------------- trustkeys -----------------------------*/}
        <div className={styles.title2}>TrustKeys Network</div>
        <div className={styles.containerRow}>
          <div className={styles.position}>Fullstack Developer</div>
          <div className={styles.workplace}>Hanoi - VN</div>
        </div>
        <div className={styles.duration}>Sep. 2021 – Present</div>

        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Analysis, design and program of the NFT exchange system</div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Maintain a secure wallet application for blockchain</div>
        </div>
        {/*------------------------------------------- vcs -----------------------------*/}
        <div className={styles.space} />
        <div className={styles.title2}>VCS Express</div>
        <div className={styles.containerRow}>
          <div className={styles.position}>Frontend Developer</div>
          <div className={styles.workplace}>Hanoi - VN</div>
        </div>
        <div className={styles.duration}>Dec. 2020 – Sep. 2021</div>

        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Operate in logistics service, cross-border dropship sales.</div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Design and develop international delivery applications to the US,
            Canada.
          </div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Language: Reactjs, Nodejs/Express.</div>
        </div>
        {/*------------------------------------------- SoeLab -----------------------------*/}
        <div className={styles.space} />
        <div className={styles.title2}>Soelab</div>
        <div className={styles.containerRow}>
          <div className={styles.position}>Fullstack Developer</div>
          <div className={styles.workplace}>Hanoi - VN</div>
        </div>
        <div className={styles.duration}>Sep. 2020 – Mar. 2021</div>

        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Learn and work on programming languages of nextjs,python/flask.</div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Database: Postgres SQl.</div>
        </div>
        {/*------------------------------------------- Education -----------------------------*/}
        <div className={styles.space} />
        <div className={styles.title}
             style={{color: themeId === 'darkId' ? 'rgba(220, 220, 220, 0.7)' : 'color: rgba(34, 34, 34, 0.7)'}}>Education</div>
        <div className={styles.title2}>Hanoi University of Science and Technology</div>
        <div className={styles.containerRow}>
          <div className={styles.position}>Computer Engineering</div>
          <div className={styles.workplace}>Hanoi - VN</div>
        </div>
        <div className={styles.duration}>2017 – 2022</div>
        {/*------------------------------------------- Projects -----------------------------*/}
        <div className={styles.space} />
        <div className={styles.title}
             style={{color: themeId === 'darkId' ? 'rgba(220, 220, 220, 0.7)' : 'color: rgba(34, 34, 34, 0.7)'}}>Projects</div>
        <div className={styles.title2}>NFT Marketplace</div>
        <div className={styles.containerRow}>
          <div className={styles.position}>https://theonly.biz</div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>A peer-to-peer marketplace for NFTs, rare digital items and crypto
            collectibles.
          </div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Designer + Developer.</div>
        </div>

        <div className={styles.space} />
        <div className={styles.title2}>Uscel</div>
        <div className={styles.containerRow}>
          <div className={styles.position}>https://uscel.com</div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>A system that connects sellers with product suppliers in the field of
            e-commerce.
          </div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Maintainer.</div>
        </div>


        <div className={styles.space} />
        <div className={styles.title2}>VCS Express</div>
        <div className={styles.containerRow}>
          <div className={styles.position}>https://vcs.express</div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Connecting between sellers and logistics services of the company or third
            party logistics, the system can
            synchronize with uscel.com.
          </div>
        </div>
        <div className={styles.detail}>
          <ChevronRight width={20} height={20} fill={themeId === 'dark' ? 'white' : 'black'} />
          <div className={styles.innerDetail}>Maintainer + Developer.</div>
        </div>
        <div className={styles.showMore}>Show more: <a href='https://www.techlens.tech/project-1'
                                                       target={'_blank'} rel="noreferrer">https://www.techlens.tech/project-1</a></div>

        {/*------------------------------------------------- skills -----------------------------------------*/}
        <div className={styles.space} />
        <div className={styles.title}
             style={{color: themeId === 'darkId' ? 'rgba(220, 220, 220, 0.7)' : 'color: rgba(34, 34, 34, 0.7)'}}>Skills</div>
        <div className={styles.detail}>
          <div className={styles.label}>Language</div>
          <div>Javascript, Golang, Dart, Nodejs, C++</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.label}>Framework</div>
          <div>Nextjs, Reactjs, React Native, Gin, Flutter, Nestjs</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.label}>Tools</div>
          <div>Git, Docker, WebStorm, Android Studio</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.label}>Basic knowledge</div>
          <div>Flutter, Postgres, Flask</div>
        </div>
        <div className={styles.showMore}>Show more: <a href='https://www.techlens.tech/uses/'
                                                       target={'_blank'} rel="noreferrer">https://www.techlens.tech/uses/ </a></div>
        {/*  --------------------------------------------- end --------------------------------------------- */}
      </div>
    </div>
  );
};