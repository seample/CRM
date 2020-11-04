import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const Login = () => import("@/views/Login");
const Register = () => import("@/views/Register");
const ForgotPassword = () => import("@/views/ForgotPassword");

//Client Routes
const Dashboard = () => import("@/views/Dashboard");
const EditProfile = () => import("@/views/dashboard/EditProfile");
const Factors = () => import("@/views/dashboard/Factors");
const Factor = () => import("@/views/dashboard/Factor");
const Shifts = () => import("@/views/dashboard/Shifts");
const Transactions = () => import("@/views/dashboard/Transactions");
const NewShift = () => import("@/views/dashboard/NewShift");
const ShiftPay = () => import("@/views/dashboard/ShiftPay");
const Users = () => import("@/views/dashboard/Users");
const NewUser = () => import("@/views/dashboard/NewUser");
const UpdateShift = () => import("@/views/dashboard/UpdateShift");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/newshift",
    name: "NewShift",
    component: NewShift,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/shiftpay",
    name: "ShiftPay",
    component: ShiftPay,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/shifts",
    name: "Shifts",
    component: Shifts,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/factor",
    name: "Factor",
    component: Factor,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/factors",
    name: "Factors",
    component: Factors,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/newuser",
    name: "NewUser",
    component: NewUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/updateshift",
    name: "UpdateShift",
    component: UpdateShift,
    meta: {
      requiresAuth: true,
    },
  },
];

let router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) === true &&
    store.getters.isLoggedIn === false
  )
    next({ name: "Login" });
  else next();
  // return console.log(to.matched.some(record => record.meta.requiresAuth))
});
export default router;
