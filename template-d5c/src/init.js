import { loadingText, messageDuration, title } from "@/config/settings";
import * as lodash from "lodash";
import { Loading, Message, MessageBox, Notification } from "element-ui";

const install = (Vue) => {
  /* 全局标题 */
  Vue.prototype.$baseTitle = title;
  /* 全局加载层 */
  Vue.prototype.$baseLoading = (text, index = 1, callback) => {
    let loading;
    loading = Loading.service({
      lock: true,
      text: text || loadingText,
      spinner: "loading-type-" + index,
      background: "hsla(0,0%,100%,.8)",
    });
    if (callback) {
      callback(loading);
    } else {
      setTimeout(() => {
        loading.close();
      }, messageDuration);
    }
  };
  /* 全局多彩加载层 */
  Vue.prototype.$baseColorfullLoading = (text, index = 1, callback) => {
    let loading;

    switch (index) {
      case 1:
        index = "gauge";
        break;
      case 2:
        index = "inner-circles";
        break;
      default:
        index = "gauge";
    }
    loading = Loading.service({
      lock: true,
      text: text || loadingText,
      spinner: index + "-loader",
      background: "hsla(0,0%,100%,.8)",
    });
    if (callback) {
      callback(loading);
    } else {
      setTimeout(() => {
        loading.close();
      }, messageDuration);
    }
  };
  /* 全局Message */
  Vue.prototype.$baseMessage = (message, type = "info") => {
    // type: success/warning/info/error
    Message({
      offset: 60,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: messageDuration,
    });
  };

  /* 全局Alert */
  Vue.prototype.$baseAlert = (content, title, callback) => {
    MessageBox.alert(content, title || "温馨提示", {
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      callback: (action) => {
        if (callback) {
          callback(action);
        }
      },
    });
  };

  /* 全局Confirm */
  Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
    MessageBox.confirm(content, title || "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnClickModal: false,
      type: "warning",
    })
      .then(() => {
        if (callback1) {
          callback1();
        }
      })
      .catch(() => {
        if (callback2) {
          callback2();
        }
      });
  };

  /* 全局Notification */
  Vue.prototype.$baseNotify = (message, title, type, position) => {
    Notification({
      title: title,
      message: message,
      position: position || "top-right",
      type: type || "success",
      duration: messageDuration,
    });
  };
  Vue.prototype.$closeBaseNotify = () => {
    return Notification.closeAll();
  };

  /* 全局lodash */
  Vue.prototype.$lodash = lodash;
  /* 全局事件总线 */
  Vue.prototype.$eventBus = new Vue();
};

export default install;
