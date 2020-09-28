import cookie from "js-cookie";

// token
export function getAccessToken() {
  return cookie.get("accessToken");
}

export function setAccessToken(accessToken) {
  return cookie.set("accessToken", accessToken);
}

export function removeAccessToken() {
  return cookie.remove("accessToken");
}

// userId
export function getUserId() {
  return cookie.get("userId");
}

export function setUserId(userId) {
  return cookie.set("userId", userId);
}

export function removeUserId() {
  return cookie.remove("userId");
}
