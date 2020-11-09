/* 登录 */
export const loginType = {
  req: (d) => {
    return {
      a: d.username,
      b: d.password,
    };
  },
  res: (d) => {
    return {
      userId: d.b,
      token: d.k,
    };
  },
};

/* 用户信息 */
export const getInfoType = {
  res: (d) => {
    return {
      userType: d.a,
      userId: d.b,
      username: d.c || "新注册用户",
      mobile: d.d,
      jobNumber: d.e || "",
      companyId: d.f,
      companyName: d.g || "",
      companyStatus: d.h,
      companyType: d.i,
      posts: d.j,
      dataType: d.k,
    };
  },
};

/* 发送验证码 */
export const sendCodeType = {
  req: (d) => ({
    b: d.mobile,
    c: d.type,
  }),
};

/* 注册 */
export const registerType = {
  req: (d) => ({
    a: d.name,
    b: d.username,
    c: d.password,
    d: 1,
    e: d.code,
    f: productId,
  }),
};
