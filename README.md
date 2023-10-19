# Personal portfolio

My design portfolio to showcase a few projects. Built with [Next.js](https://nextjs.org/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/).

## Install & run

Make sure you have nodejs `18.0.0` or higher and npm `8.6.0` or higher installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

## Deployment

I've set up the site using AWS for hosting and serverless functions. You'll need an AWS account and the AWS CLI installed in order to deploy.

Deploy the site to s3:

```bash
npm run deploy
```

Deploy serverless functions:

```bash
cd functions
```

```bash
npm run deploy:api
```

## Permissions

I'm cool with anyone using the code or parts of the code for their own site, it is open source so people can learn from it and adapt it. However, I would encourage you to modify the theme and components it to make it your own. If you are using the site's design largely unmodified, I'd appreciate being credited as the designer of the website.
