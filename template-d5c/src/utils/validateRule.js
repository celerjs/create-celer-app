import * as valid from "./validate";
import { trim } from "./index";

// 验证密码
export const validatePwd = (rule, value, callback) => {
  if (!valid.isPassword(value)) {
    callback(new Error("请输入正确的密码"));
  } else {
    callback();
  }
};

// 验证码手机号
export const validateTel = (rule, value, callback) => {
  if (!valid.isPhone(value)) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};

// 验证身份证
export const validateID = (rule, value, callback) => {
  if ((rule.required && !value) || (value && !valid.isID(value)) || !value) {
    callback(new Error("请输入正确的身份证号"));
  } else {
    callback();
  }
};

// 验证车牌号
export const validateCarNO = (rule, value, callback) => {
  if (!valid.isCarNo(value)) {
    callback(new Error("请输入正确的车牌号"));
  } else {
    callback();
  }
};
// 验证码电话号
export const validateCell = (rule, value, callback) => {
  if (!valid.isCell(value)) {
    callback(new Error("请输入正确的电话号码"));
  } else {
    callback();
  }
};
// 验证挂车牌号
export const validateGuaCarNO = (rule, value, callback) => {
  if (value && !valid.isCarNo1(value)) {
    callback(new Error("请输入正确的挂车牌号"));
  } else {
    callback();
  }
};

// 验证车辆识别码
export const validateCarDiscernNo = (rule, value, callback) => {
  if (value) {
    if (trim(value)) {
      if (!valid.validatAlphanumeric(trim(value))) {
        callback(new Error("请输入正确的车辆识别码"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  } else {
    callback();
  }
};

// 验证荷载吨数
export const validateCarTon = (rule, value, callback) => {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  if (!reg.test(value) || parseInt(value, 10) > 1000) {
    callback(new Error("请输入正确的荷载吨数"));
  } else {
    callback();
  }
};

// 验证正整数
export const validateNumber = (rule, value, callback) => {
  const reg = /^[+]{0,1}(\d+)$/;
  if (value && !reg.test(value)) {
    callback(new Error("请输入正确的整数"));
  } else {
    callback();
  }
};

/*
大于0 保留2位小数
小于 6位数
*/
export function validateFloat(rule, value, callback) {
  const reg = /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/;
  if (
    (rule.required && !value) ||
    (value && !reg.test(value)) ||
    parseFloat(value) > 10000000
  ) {
    callback(new Error("请输入合理的数"));
  } else {
    callback();
  }
}

/*
大于0 保留2位小数
小于 6位数
*/
export function validateInt(rule, value, callback) {
  const reg = /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/;
  value = +value;
  if (
    (rule.required && !value) ||
    (value && !reg.test(value)) ||
    parseFloat(value) > 10000000
  ) {
    callback(new Error("请输入合理的吨数"));
  } else {
    callback();
  }
}

/*
  损耗
*/
export function validateLose(rule, value, callback) {
  if ((rule.required && value === "") || parseFloat(value) < 0) {
    callback(new Error("请输入合理的损耗"));
  } else {
    callback();
  }
}
