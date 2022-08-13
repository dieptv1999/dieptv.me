import Head from 'next/head';
import styled from 'styled-components';
import { GetStaticPropsResult, NextPage } from 'next';
import { NotionAPI } from 'notion-client';
import Image from 'next/image';

import { getPageInfo, Page, POSTS } from '@posts/notion';
import { Title, Link, Container, Grid, Text } from '@components';
import React from 'react';

interface BlogProps {
  pages: Page[];
}

const BlogImage = styled.div`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const BlogContainer = styled(Container)`
  :hover > * img {
    transform: scale(1.03);
  }
`;

const Blog: NextPage<BlogProps> = ({ pages }) => {
  return (
    <Container maxWidth={1200}>
      <Head>
        <title>Blog - Dieptv</title>
        <meta property="og:title" content="Blog – Dieptv" />
      </Head>
      <Container mb="3rem">
        <Title>Blog</Title>
        <Text textAlign="center">
          Posts about code, projects and various other things. <br />
          An RSS feed is available at this{' '}
          <a target="_blank" href="/blog/feed.xml">
            link
          </a>
          .
        </Text>
      </Container>
      <Grid
        pb="4rem"
        gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
        width="100%"
        gridGap="10%"
      >
        {pages.map(({ title, uri, date, cover }, i) => (
          <BlogContainer
            key={title}
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            height="100%"
            gridGap="1.5rem"
          >
            <Link key={i} href={uri}>
              <BlogImage>
                <Image
                  src={cover || '/blur.jpeg'}
                  blurDataURL={'/blur.jpeg'}
                  placeholder={'blur'}
                  layout={'fill'}
                  objectFit={'cover'}
                  className="ease-in-out duration-300"
                />
              </BlogImage>
              <Container
                gridGap=".5rem"
                alignItems={['center', 'flex-start']}
                paddingTop={15}
              >
                <Title
                  as="h2"
                  fontSize="1.5rem"
                  textAlign={['center', 'left']}
                  margin={0}
                >
                  {title}
                </Title>
                <Text margin={0} fontWeight="initial" fontSize=".9rem">
                  {date}
                </Text>
              </Container>
            </Link>
          </BlogContainer>
        ))}
      </Grid>
    </Container>
  );
};

const notion = new NotionAPI();

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<BlogProps>
> => {
  const pages: Page[] = [];
  await Promise.all(
    Object.keys(POSTS).map(async (key) => {
      const { uri, date } = POSTS[key as keyof typeof POSTS];
      const page = await notion.getPage(uri);
      if (page) {
        const info = getPageInfo(page);
        if (info.title !== 'Blog') {
          pages.push({
            ...info,
            date,
            uri: `/blog/${key}`,
          });
        }
      }
    }),
  );

  return {
    props: {
      pages: pages.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    },
  };
};

export default Blog;
