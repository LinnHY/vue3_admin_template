export const constantRoutes = [
  {
    path: "/login",
    component: () => import("../views/login.vue"),
    name: "login",
    meta: {
      title: "登录",
      icon: "Promotion",
      hidden: true,
    },
  },
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    name: "layout",
    meta: {
      icon: "Avatar",
      hidden: false,
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("../views/home.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("../views/404.vue"),
    name: "404",
    meta: {
      title: "404",
      icon: "DocumentDelete",
      hidden: true,
    },
  },
  {
    path: "/screen",
    name: "screen",
    component: () => import("../views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      icon: "Platform",
      hidden: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "任意路由",
      icon: "DataLine",
      hidden: true,
    },
  },
  {
    path: "/acl",
    component: () => import("../layout/index.vue"),
    name: "acl",
    meta: {
      title: "权限管理",
      icon: "Lock",
      hidden: false,
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("../views/acl/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "User",
          hidden: false,
        },
      },
      {
        path: "/acl/role",
        component: () => import("../views/acl/role/index.vue"),
        meta: {
          title: "角色管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/acl/permission",
        component: () => import("../views/acl/permission/index.vue"),
        meta: {
          title: "菜单管理",
          icon: "Checked",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("../layout/index.vue"),
    name: "product",
    redirect: "/product/trademark",
    meta: {
      title: "商品管理",
      icon: "Goods",
      hidden: false,
    },
    children: [
      {
        path: "/product/trademark",
        component: () => import("../views/product/trademark/index.vue"),
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
          hidden: false,
        },
      },
      {
        path: "/product/attr",
        component: () => import("../views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          icon: "ChromeFilled",
          hidden: false,
        },
      },
      {
        path: "/acl/spu",
        component: () => import("../views/product/spu/index.vue"),
        meta: {
          title: "SPU管理",
          icon: "Calendar",
          hidden: false,
        },
      },
      {
        path: "/acl/sku",
        component: () => import("../views/product/sku/index.vue"),
        meta: {
          title: "SKU管理",
          icon: "Orange",
          hidden: false,
        },
      },
    ],
  },
];
export const asyncRoutes = [
  {
    path: "/acl",
    component: () => import("../layout/index.vue"),
    name: "acl",
    meta: {
      title: "权限管理",
      icon: "Lock",
      hidden: false,
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("../views/acl/user/index.vue"),
        meta: {
          title: "用户管理",
          icon: "User",
          hidden: false,
        },
      },
      {
        path: "/acl/role",
        component: () => import("../views/acl/role/index.vue"),
        meta: {
          title: "角色管理",
          icon: "UserFilled",
          hidden: false,
        },
      },
      {
        path: "/acl/permission",
        component: () => import("../views/acl/permission/index.vue"),
        meta: {
          title: "菜单管理",
          icon: "Checked",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("../layout/index.vue"),
    name: "product",
    redirect: "/product/trademark",
    meta: {
      title: "商品管理",
      icon: "Goods",
      hidden: false,
    },
    children: [
      {
        path: "/product/trademark",
        component: () => import("../views/product/trademark/index.vue"),
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
          hidden: false,
        },
      },
      {
        path: "/product/attr",
        component: () => import("../views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          icon: "ChromeFilled",
          hidden: false,
        },
      },
      {
        path: "/acl/spu",
        component: () => import("../views/product/spu/index.vue"),
        meta: {
          title: "SPU管理",
          icon: "Calendar",
          hidden: false,
        },
      },
      {
        path: "/acl/sku",
        component: () => import("../views/product/sku/index.vue"),
        meta: {
          title: "SKU管理",
          icon: "Orange",
          hidden: false,
        },
      },
    ],
  },
];
export const anyRoutes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "任意路由",
      icon: "DataLine",
      hidden: true,
    },
  },
];
