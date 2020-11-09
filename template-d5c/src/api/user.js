import request from "@/utils/request";
import { loginType, getInfoType } from "./userType";

/* ----------登录------------ */
export const login = (data, options = {}) => {
  // 入参处理
  const req = loginType.req(data);

  return request
    .post("/paas/mm/userlogin?md=10&cmd=01", req, options)
    .then((res) => {
      //  回参处理
      res = loginType.res(res);
      return res;
    });
};

/* ----------用户信息------------ */
export const getInfo = () => {
  return request.post("/saas/res/user/login/info").then((res) => {
    //  回参处理
    res = getInfoType.res(res.d);
    return res;
  });
};

/* ----------发送验证码------------ */
export const sendCode = (data, options = {}) => {
  // 入参处理
  const req = sendCodeType.req(data);
  return request.post("/saas/acc/msm/securitycode", req).then((res) => {
    //  回参处理
    res = getInfoType.res(res.d);
    return res;
  });
};

/* ----------注册------------ */
export const register = (data, options = {}) => {
  // 入参处理
  const req = registerType.req(data);
  return request.post("/saas/acc/user/register", req, options).then((res) => {
    //  回参处理
    // res = getInfoType.res(res.d);
    return res;
  });
};
