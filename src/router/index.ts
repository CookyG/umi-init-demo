import HomeRouter from './modules/home';
const routerArr: Array<any> = [
  ...HomeRouter,
  { exact: true, path: '/', redirect: '/home/list' },
];

export default routerArr;
