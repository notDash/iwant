import http from './http';

// 登录
export const login = loginin => (
  http.post('/api/users/login', loginin)
);

export const regist = loginin => (
  http.post('/api/users/regist', loginin)
);
