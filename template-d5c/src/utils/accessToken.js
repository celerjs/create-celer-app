import cookie from "js-cookie";
import { abbreviation } from "@/config/settings";
// token
export function getAccessToken() {
  return cookie.get(`accessToken-${abbreviation}`);
}

export function setAccessToken(accessToken) {
  return cookie.set(`accessToken-${abbreviation}`, accessToken);
}

export function removeAccessToken() {
  return cookie.remove(`accessToken-${abbreviation}`);
}

// userId
export function getUserId() {
  return cookie.get(`userId-${abbreviation}`);
}

export function setUserId(userId) {
  return cookie.set(`userId-${abbreviation}`, userId);
}

export function removeUserId() {
  return cookie.remove(`userId-${abbreviation}`);
}
