import fs from 'fs';
import path from 'path';
import { Post, postMarkdown } from 'layouts/Post';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import { useEffect, useMemo, useState } from 'react';
import readingTime from 'reading-time';
import rehypeImgSize from 'rehype-img-size';
import rehypeMinify from 'rehype-preset-minify';
import rehypeSlug from 'rehype-slug';
import { POSTS_PATH, postFilePaths } from 'utils/mdx';
import { formatTimecode } from 'utils/timecode';
import rehypePrism from '@mapbox/rehype-prism';
import { generateOgImage } from './og-image';
// import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import { TableOfContent } from '../../components/TableOfContent';

export default function PostPage({ frontmatter, code, timecode, ogImage }) {
  const MDXComponent = useMemo(() => getMDXComponent(code), [code]);

  const [ids, setIds] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const titles = document.querySelectorAll('h2');
      const idArrays = Array.prototype.slice
        .call(titles)
        .map((title) => ({ id: title.id, title: title.innerText }));
      setIds(idArrays);
    }, 500);
  }, [frontmatter.title]);

  return (
    <Post timecode={timecode} ogImage={ogImage} {...frontmatter} tableOfContent={<TableOfContent ids={ids}/>}>
      <MDXComponent components={postMarkdown} />
    </Post>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath, 'utf-8');

  const { code, frontmatter, matter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // rehypeRemark,
        rehypePrism,
        rehypeSlug,
        rehypeMinify,
        [rehypeImgSize, { dir: 'public' }],
      ];

      return options;
    },
  });

  const { time } = readingTime(matter.content);
  const timecode = formatTimecode(time);

  const ogImage = await generateOgImage({
    title: frontmatter.title,
    date: frontmatter.date,
    banner: frontmatter.banner,
    timecode,
  });

  return {
    props: { code, frontmatter, timecode, ogImage },
    notFound: process.env.NODE_ENV === 'production' && frontmatter.draft,
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map(filePath => filePath.replace(/\.mdx?$/, ''))
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
