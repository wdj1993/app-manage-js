// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/account',
              name: 'account',
              icon: 'crown',
              // component: './AccountCenter',
              routes: [
                {
                  path: '/account/center',
                  name: 'center',
                  icon: 'smile',
                  component: './AccountCenter',
                },
                {
                  path: '/account/settings',
                  name: 'settings',
                  icon: 'smile',
                  component: './AccountSettings',
                },
              ],
            },
            {
              name: 'list.circle-list',
              icon: 'smile',
              path: '/listsearcharticles',
              component: './ListSearchArticles',
            },
            {
              name: 'list.basic-list',
              icon: 'smile',
              path: '/listbasiclist',
              component: './ListBasicList',
            },
            {
              name: 'list.card-list',
              icon: 'smile',
              path: '/listcardlist',
              component: './ListCardList',
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              name: 'form.step-form',
              icon: 'smile',
              path: '/recharge',
              component: './recharge',
            },
            {
              name: 'dashboard.workplace',
              icon: 'smile',
              path: '/home',
              component: './Home',
            },
            {
              name: 'dashboard.analysis',
              icon: 'smile',
              path: '/dashboardanalysis',
              component: './DashboardAnalysis',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
