export default {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: `${process.env.NEXT_PUBLIC_TITLE_WEB || `TechLens - Developer Mobile/Web`}`,
    url: process.env.NEXT_PUBLIC_SEO_DEFAULT_URL,
    description: 'I\'m a Full Stack developer with experience in Backend, Frontend and mobile development. Currently Software Engineer of Trustkeys and living in Hanoi.',
    images: [
      {
        url: 'https://dieptv.vercel.app/social-image.png',
        description: "TechLens Image" || '',
        width: 1841,
        height: 949,
        type: 'image/png',
        alt: `${process.env.NEXT_PUBLIC_TITLE_WEB || `TechLens - Developer Mobile/Web`}`,
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
}
