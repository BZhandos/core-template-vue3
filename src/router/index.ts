import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/views/MainLayouts/MainLayout.vue'
import cookie from "js-cookie";

const routes =  [
  /**
   * @typedef {Object} RouteConfig
   * @property {string} path - путь
   * @property {string} name - название
   * @property {Object} meta - мета дата для роута
   * @property {boolean} meta.isOpen - показатель доступа без аутентикации
   *  @param {Function} component - импортированный компонент
   *  @param {Function} component - импортировать прямо тут для отдельного chank-а (lazy-loading)
   *  например component: () => import('../views/Test.vue') создаст (Test.[hash].js) для этого роута
   */
  {
    path: "/",
    name: "home",
    component: MainLayout,
    // children: [
    //   {
    //     path: "/child1",
    //     name: "child1",
    //     component: child1,
    //     meta: {
    //       isOpen: false,
    //     },
    //   }
    // ],
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      isOpen: true,
    },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeResolve((to, from, next) => {
  const isAuthenticated =  Boolean(cookie.get("accessToken"));
  if (to.meta.isOpen) {
    return next();
  } else {
    if (isAuthenticated) {
      // здесь можно дополнительно проверять роль
      next();
    } else next({name: "LoginView"});
  }
});


export default router
