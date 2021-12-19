import { ExtendedRecordMap } from 'notion-types/src/maps';
import { getPageTitle } from 'notion-utils';

export const POSTS = {
  'nft-tutorial': {
    date: new Date('2021-12-19').toDateString(),
    uri: 'sharp-peach-033.notion.site/Get-started-with-Trustkeys-NFT-Marketplace-f43972b1bc074636af0d47e9408e1d85',
  },
  'real-time-application-arduino-with-android-firebase': {
    date: new Date('2020-06-28').toDateString(),
    uri: 'sharp-peach-033.notion.site/X-y-d-ng-ng-d-ng-realtime-theo-d-i-nhi-t-m-nh-s-ng-s-d-ng-Firebase-Ph-n-II-9f340fde93594fb59130f339bb1865f5',
  },
  'waveview-android': {
    date: new Date('2020-07-06').toDateString(),
    uri: 'sharp-peach-033.notion.site/H-ng-d-n-t-o-WaveView-trong-Android-392c8cae65fa4a27962bfc4bc5d73fa5',
  },
  'data-type-golang': {
    date: new Date('2020-07-06').toDateString(),
    uri: 'sharp-peach-033.notion.site/C-c-ki-u-d-li-u-trong-ng-n-ng-l-p-tr-nh-Go-04639db31ecf480e94dd423766e7dc2e',
  },
};

export const EXPERIENCES = {
  shareview: {
    date: '2020 - Now',
    uri: 'shblog/Shareview-CTO-b3f7d62a744d4cb7bd271d25f4790ece',
  },
  dispatcher: {
    date: '2020',
    uri: 'shblog/Dispatcher-Go-Backend-developer-fa13680ef8324bacb31b773a5f08c3ad',
  },
  tresorio: {
    date: '2019 - 2020',
    uri: 'shblog/Tresorio-12516126ddb84eb6abc72656731e1f26',
  },
  epitech: {
    date: '2018',
    uri: 'shblog/Epitech-Teaching-assistant-b8ee49774bd5423ba00a6921c026c1c6',
  },
  bilberry: {
    date: '2018 - 2020',
    uri: 'shblog/Bilberry-28dc7324b3e24fd6a4475a63c2ac0410',
  },
};

export interface PageInfo {
  title: string;
  cover?: string;
  coverPosition?: number;
}

export interface Page extends PageInfo {
  uri: string;
  date: string;
}

export const getPageInfo = (page: ExtendedRecordMap): PageInfo => {
  const info: PageInfo = {
    title: getPageTitle(page),
  };

  const block = Object.values(page.block)[0].value;
  if (block.type === 'page' && block.format?.page_cover) {
    info.coverPosition = block.format.page_cover_position;
    info.cover =
      'https://www.notion.so/image/' +
      encodeURIComponent(block.format.page_cover) +
      '?table=block&id=' +
      block.id;
  }

  return info;
};
