import pagesJson from '@/pages.json'

import { queryString } from '@/utils/common'

const tabBarPagesMap = pagesJson.tabBar.list.map((i) => {
  return {
    type: 'tabBarPage',
    path: `/${i.pagePath}`,
  };
});

const pages = pagesJson.pages.map((i) => {
  return {
    type: 'page',
    path: `/${i.path}`,
  };
});

export const pagesMap = [...tabBarPagesMap, ...pages];

export function forward(page: string, query: Types.Query = {}): any {
  const targetPage = pagesMap.find(i => i.path === page);
  if (!targetPage)
    return;
  const isReplace = query.replace;
  delete query.replace;
  const { type, path } = targetPage;
  const url = `${path}?${queryString(query)}`;
  const params = { url };
  if (type === 'tabBarPage')
    return uni.switchTab(params);
  if (!isReplace)
    return uni.navigateTo(params);
  uni.redirectTo(params);
}

export function back(delta: number) {
  uni.navigateBack({
    delta,
  });
}
