import LoginRouter from './modules/login';
import HomeRouter from './modules/home';
const routerArr = [
  ...LoginRouter,
  ...HomeRouter,
  { exact: true, path: '*', redirect: '/' },
];

export default routerArr;
