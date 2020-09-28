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
