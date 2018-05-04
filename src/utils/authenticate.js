import Cookies from 'js-cookie'

/**@function
 * @description: 清除缓存
*/
export function cleanUserInfo(userObj) {
  Cookies.remove(userObj.username);
  Cookies.remove(userObj.password);
  return;
}

/**
 * @function
 * @description:增加缓存
 */
export function addUserInfo(userObj) {
  return new Promise((resolve, reject) => {
    Cookies.set('user', userObj.username);
    Cookies.set('password', userObj.password);
    resolve();
  })
}