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
      username: d.c,
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
