import gamestackTexture2Large from 'assets/trustkey-2.png';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/trustkey-2.png';
import gamestackTextureLarge from 'assets/trustkey.png';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/trustkey.png';
import aioTexture from 'assets/aio_1.webp';
import aioTexture2 from 'assets/aio_2.webp';
import sliceTextureLarge from 'assets/vcs.png';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/vcs.png';
import sprTextureLarge from 'assets/TheOnly_cover-09.jpg';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/TheOnly_cover-09_small.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Mobile', 'Photographer', 'Animator'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectFour, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' },
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title='Developer Mobile/Web'
        description="I'm a Full Stack developer with experience in Backend, Frontend and mobile development. Currently Software Engineer of Trustkeys and living in Hanoi."
      />
      <Intro
        id='intro'
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id='project-1'
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title='Discover, collect, and sell extraordinary NFTs'
        description='TheOnly.biz - is a premier decentralized NFT platform, developed by TrustKeys Network'
        buttonText='View website'
        buttonLink='https://theonly.biz/'
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: [sprTexture, sprTextureLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id='project-4'
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={2}
        title='All in one | Lifecare App'
        description='Application for buying and selling, managing construction products, home appliance repair services'
        buttonText='View website'
        buttonLink='https://play.google.com/store/apps/details?id=com.viettel.aioapp/'
        model={{
          type: 'phone',
          alt: 'App homepage aio screen',
          textures: [
            {
              srcSet: [aioTexture, aioTexture],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [aioTexture2, aioTexture2],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id='project-2'
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title='TrustKeys NFT Crypto SuperApp'
        description='Secured Wallet, Exchange, Messaging and More'
        buttonText='View website'
        buttonLink='https://trustkeys.network/'
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id='project-3'
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title='VCS Express'
        description='Global e-commerce shipping (USA, Canada).'
        buttonText='View website'
        buttonLink='https://vcs.express/'
        model={{
          type: 'laptop',
          alt: 'Annotating a website image in the VCS app',
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      {/*<div className={styles.famousSaying}>*/}
      {/*  <div>*/}
      {/*    <div>*/}
      {/*      "Make things as simple as possible, but not simpler."*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <div>*/}
      {/*        //*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        Albert Einstein*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id='details'
      />
      <Footer />
    </div>
  );
};
