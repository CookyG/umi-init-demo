const HomeRouter: Array<any> = [
  {
    path: '/home',
    component: '@/pages/home/index.tsx',
    routes: [
      { path: 'list', component: '@/pages/project/index.tsx' },
      { path: '/home/', redirect: '/home/list' },
    ],
  },
];

export default HomeRouter;
