import { defineConfig } from 'umi';
import routes from './src/router/index';

//iconfont online src https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.12&manage_type=myprojects&projectId=2409301&keyword=&project_type=&page=
const iconHref = '';

export default defineConfig({
  hash: true,
  mountElementId: 'App',
  links: [
    // {
    //   rel: 'stylesheet',
    //   href: iconHref,
    // },
  ],
  theme: {
    // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
    hack: `true; @import "~@/assets/css/antbase/base.less";`,
  },
  sass: {
    prependData: `@import "./src/assets/css/initConfig/var.scss";`,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
    title: false,
  },
  routes: routes,
  alias: {
    '@img': '@/assets/images',
  },
  fastRefresh: {},
});
