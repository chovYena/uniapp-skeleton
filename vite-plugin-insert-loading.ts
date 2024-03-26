import * as fs from 'node:fs';
import path from 'node:path';

import normallize from 'normalize-path';
import type { PluginOption } from 'vite';

export const defaultPagesRE = /src[\/\\]pages(.*)[\/\\](.*)[\/\\](.*)\.vue$/;

export default function insertLoading() {
  const template = fs.readFileSync(normalizePagePathFromBase('./src/layout/AppProvider.vue'), 'utf-8');
  return <PluginOption>{
    name: 'insert-loading',
    transform(code, id) {
      id = normalizePagePathFromBase(id);
      const regResult = defaultPagesRE.exec(id);
      if (regResult) {
        const oldTemplate = /<template>([\s\S]*)<\/template>/.exec(code);
        const tempString = oldTemplate != null ? oldTemplate[1] : '';
        const newTemplate = template.replace('<!-- template -->', tempString as string);
        code = code.replace(/<template>([\s\S]*)<\/template>/, newTemplate);
      }
      return code;
    },
  };
  function normalizePagePathFromBase(file: string) {
    return normallize(path.relative(process.cwd(), file));
  }
}
