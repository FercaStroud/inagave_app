
import HomePage from '../pages/home.vue';
import WithdrawsPage from '../pages/withdraws.vue';
import FormPage from '../pages/form.vue';
import CatalogPage from '../pages/catalog.vue';
import StorePage from '../pages/store.vue';
import ProductPage from '../pages/product.vue';
import SettingsPage from '../pages/settings.vue';
import PlantsPage from '../pages/plants.vue';

import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/withdraws/',
    component: WithdrawsPage,
  },
  {
    path: '/store/',
    component: StorePage,
  },
  {
    path: '/plants/',
    component: PlantsPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
