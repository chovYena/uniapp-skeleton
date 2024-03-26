import * as fs from 'node:fs';
import path from 'node:path';

import normallize from 'normalize-path';
import type { PluginOption } from 'vite';

export const defaultPagesRE = /src[\/\\]pages(.*)[\/\\](.*)[\/\\](.*)\.vue$/;
export interface Options {
  pagesRE: RegExp
  name: string
  configPath: string
  pluginName: string
}
export default function (options: Partial<Options> = {}) {
  const {
    pagesRE = defaultPagesRE,
    name = './src/layout/AppProvider.vue',
    pluginName = 'AppProvider',
  } = options;

  const template = fs.readFileSync(normalizePagePathFromBase(name), 'utf-8');

  return <PluginOption>{
    name: pluginName,
    enforce: 'pre',
    transform(code, id) {
      id = normalizePagePathFromBase(id);
      const regResult = pagesRE.exec(id);

      if (regResult && (regResult[2] === regResult[3] || regResult[3] === 'index')) {

        const oldTemplate = /<template>([\s\S]*)<\/template>/.exec(code);

        const tempString = oldTemplate != null ? oldTemplate[1] : '';
        const newTemplate = template.replace('<!-- template -->', tempString as string);
        code = code.replace(/<template>([\s\S]*)<\/template>/, newTemplate);
      }
      return { code, map: null };
    },
  };

  function normalizePagePathFromBase(file: string) {
    return normallize(path.relative(process.cwd(), file));
  }
}
