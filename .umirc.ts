import { defineConfig } from 'umi';
import routes from './src/router/index';

export default defineConfig({
  hash: true,
  mountElementId: 'App',
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
  fastRefresh: {},
});
