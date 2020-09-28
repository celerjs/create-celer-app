/* 公共引入,勿随意修改,修改时需经过确认 */
import Vue from "vue";
import "./element";
import "@/styles/global.scss";

// 全局fortawesome图标组件
import "./fasicon";
// 路由权限
import "@/permission";

// 公共svg图标组件
import "@/icons";

// 公共分页组件
import Pagination from "@/components/Pagination";
Vue.component("Pagination", Pagination);

// 公共弹框组件
import Dialog from "@/components/Dialog";
Vue.component("Dialog", Dialog);

// 公共上传组件
import Upload from "@/components/Upload";
Vue.component("d5c-upload", Upload);

// 公共搜索
import Search from "@/components/SearchForm";
Vue.component("search-wrap", Search);
import SearchItem from "@/components/SearchForm/item";
Vue.component("search-item", SearchItem);

// $viewer
import Viewer from "./viewer";
Vue.use(Viewer);
