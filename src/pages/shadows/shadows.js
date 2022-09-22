import { CubicBezierVisualizer } from 'components/CubicBezierVisualizer';
import { NextSeo } from 'next-seo';
import styles from './Shadows.module.css';
import {
    globalStyles,
    Tooltip,
    ThemeProvider,
} from '@maximeheckel/design-system';

export const Shadows = () => {
    globalStyles();


    return (
        <div className={styles.container}>
            <NextSeo
                title={'CSS Shadows generator'}
                description={'Create a CSS Shadows snippet for your frontend project'}
                canonical="https://www.techlens.tech/"
                openGraph={{
                    url: 'https://www.techlens.tech/shadows/',
                    title: 'CSS Shadows generator',
                    description: 'Create a CSS Shadows snippet for your frontend project',
                    images: [
                        {
                            url: 'https://i.ibb.co/kMTCLvp/Screenshot-from-2022-09-21-19-50-38.png',
                            width: 1854,
                            height: 947,
                            alt: 'Og Image Alt',
                            type: 'image/png',
                        },
                    ],
                    site_name: 'Glassmorphism',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <ThemeProvider>
                <Tooltip.Provider>
                    <div className={styles.containerEditCubic}>
                        <CubicBezierVisualizer editable={true} />
                    </div>
                </Tooltip.Provider>
            </ThemeProvider>
        </div>
    );
};