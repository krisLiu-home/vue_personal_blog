// 发送请求时 如果有token 则要把token放到请求头中
// 响应的时候如果有token 则把token保存到 localStorage中
// 响应的时候如果是403  则把localStorage中的token删除
import axios from 'axios';

export default function () {
  const token = localStorage.getItem('token');
  let instance = axios;

  // 发送请求时 如果有token 则要把token放到请求头中
  if (token) {
    instance = instance.create({
      headers: {
        authorization: 'bearer ' + token,
      }
    });
  }


  instance.interceptors.response.use(function (resp) {
    if (resp.headers.authorization) {
      localStorage.setItem('token', resp.headers.authorization);
    }
    return resp;
  }, function (err) {
    if (err.response.status === 403) {
      // token过期 删除localStorage中的token
      localStorage.removeItem('token');
    }
    return Promise.reject(err);

  });
  return instance;
}