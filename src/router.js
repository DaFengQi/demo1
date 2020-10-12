import Vue from "vue";
import Router from "vue-router";

const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Cart = () => import("views/shopcart/Cart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");

//1.安装插件
Vue.use(Router);

//2.创建导出插件
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/category",
      component: Category
    },
    {
      path: "/shopcart",
      component: Cart
    },
    {
      path: "/profile",
      component: Profile
    },
    {
      path: "/detail/:iid",
      component: Detail
    }
  ]
});
