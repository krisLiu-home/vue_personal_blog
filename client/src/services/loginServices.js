import request from './request';

// 登录
export async function login(loginId, loginPwd) {
  const result = await request().post('/api/admin/login', {
    loginId,
    loginPwd
  });
  return result
}


// 登出
export function loginOut() {
  localStorage.removeItem('token');
}

// who am i
export async function whoAmI() {
  const result = await request().get('/api/admin/whoami');
  return result.data;
}