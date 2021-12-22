import React from 'react';
import { Title, Text, Container, Grid, Link, Card } from '@components';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import {
  SiGo,
  SiPostgresql,
  SiTypescript,
  SiGooglecloud,
  SiReact,
  SiPython,
  SiGraphql,
  SiJava,
  SiArduino,
  SiFlutter,
  SiMysql,
  SiAndroid,
  SiGithub,
  SiNextdotjs,
} from 'react-icons/si';
import { getPosts, Post } from '@posts';
import { TransparentLink } from '@components';

interface AboutProps {
  experiences: Post[];
}

const About = ({ experiences }: AboutProps): JSX.Element => {
  const stacks = React.useMemo(
    () => [
      {
        Icon: SiGo,
        url: 'https://golang.org/',
      },
      // {
      //   Icon: SiKubernetes,
      //   url: 'https://kubernetes.io/',
      // },
      {
        Icon: SiTypescript,
        url: 'https://www.typescriptlang.org/',
      },
      {
        Icon: SiReact,
        url: 'https://reactjs.org/',
      },
      {
        Icon: SiGraphql,
        url: 'https://graphql.org/',
      },
      // {
      //   Icon: SiAmazonaws,
      //   url: 'https://aws.amazon.com/',
      // },
      {
        Icon: SiNextdotjs,
        url: 'https://nextjs.org/',
      },
      // {
      //   Icon: SiElixir,
      //   url: 'https://elixir-lang.org/',
      // },
      {
        Icon: SiGooglecloud,
        url: 'https://cloud.google.com/',
      },
      // {
      //   Icon: SiTerraform,
      //   url: 'https://www.terraform.io/',
      // },
      {
        Icon: SiPostgresql,
        url: 'https://www.postgresql.org/',
      },
      {
        Icon: SiPython,
        url: 'https://www.python.org/',
      },
      {
        Icon: SiJava,
        url: 'https://www.java.com/en/',
      },
      {
        Icon: SiReact,
        url: 'https://reactnative.dev/',
      },
      {
        Icon: SiArduino,
        url: 'https://www.arduino.cc/',
      },
      {
        Icon: SiFlutter,
        url: 'https://flutter.dev/',
      },
      {
        Icon: SiMysql,
        url: 'https://www.mysql.com/',
      },
      {
        Icon: SiAndroid,
        url: 'https://www.android.com/intl/vi_vn/',
      },
      {
        Icon: SiGithub,
        url: 'https://github.com/',
      },
    ],
    [],
  );

  return (
    <Container>
      <Head>
        <title>Dieptv99</title>
      </Head>
      <Container alignContent="center" alignItems="center">
        <Title fontSize={['3rem', '4rem']} as="h2">
          Developer & passionate
        </Title>
        <Container maxWidth={['100%', '700px']} marginY="2rem">
          <Text textAlign={'center'}>
            I&apos;m a Full-Stack/DevOps developer living in Hanoi Viet Nam.
          </Text>
          <Text textAlign={'center'}>
            During my free time I like going playing game, jogging, make design
            and make video edits on After Effects. You can check some cool drone
            edits on my{' '}
            <a href="https://www.instagram.com/dieptv_nd/">Instagram</a>.
          </Text>
        </Container>
      </Container>

      <Container
        paddingY="4rem"
        gridGap="2rem"
        alignContent="center"
        alignItems="center"
        textAlign="center"
        width="100%"
      >
        <Title fontSize="40px" as="h2">
          Technologies I frequently use
        </Title>
        <Grid
          gridTemplateColumns={['repeat(3 , 1fr)', 'repeat(6 , 1fr)']}
          gridGap="1rem"
          justifyItems="center"
          maxWidth="40rem"
        >
          {stacks.map(({ Icon, url }, i) => (
            <Link href={url} key={url}>
              <Card key={i}>
                <Icon size="2rem" />
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
      <Container
        alignContent="center"
        alignItems="center"
        textAlign="center"
        width="100%"
        paddingBottom="4rem"
        gridGap="3rem"
      >
        <Title fontSize="40px" as="h2">
          Work Experiences
        </Title>
        <Container width="100%">
          {experiences.map(({ data }, i) => (
            <TransparentLink
              // href={`/about/${data.slug}`}
              key={data.slug}
            >
              <Grid
                key={i}
                gridTemplateColumns="1fr 4fr"
                justifyItems="flex-start"
                gridGap="1rem"
                paddingY="2rem"
                borderBottom="1px solid rgba(0,0,0,0.1)"
              >
                <Container width="100%">
                  <Text>0{experiences.length - i}</Text>
                </Container>
                <Grid width="100%" gridTemplateColumns="4fr 1fr">
                  <Container
                    width="100%"
                    alignItems="flex-start"
                    textAlign="start"
                  >
                    <Grid
                      width="100%"
                      gridTemplateColumns="repeat(2, auto)"
                      justifyItems="flex-start"
                      justifyContent="flex-start"
                      gridGap="1rem"
                    >
                      <Title fontSize="1.5rem" margin={0} as="h3">
                        {data.title}
                      </Title>
                      <Text
                        fontSize="smaller"
                        margin={0}
                        color="rgba(0, 0, 0, 0.1)"
                      >
                        {data.date}
                      </Text>
                    </Grid>
                    <Text fontSize="1rem">{data.caption}</Text>
                  </Container>
                  <Text fontSize="1.5rem">&rarr;</Text>
                </Grid>
              </Grid>
            </TransparentLink>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const experiences = await getPosts('experiences');
  experiences.sort((a, b) =>
    b.data.date.toString().localeCompare(a.data.date.toString()),
  );

  return {
    props: {
      experiences,
    },
  };
};

export default About;
