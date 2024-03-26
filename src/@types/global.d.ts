declare namespace Types {
  type Query = {
    replace?: boolean
    [propName: string]: any
  }
}

declare module 'uview-plus';
declare module 'uview-plus/libs/mixin/mpShare.js';
declare interface Uni {
  $u: any
}
