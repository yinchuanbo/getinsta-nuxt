const path = 'v1';
export default {
  register: `${path}/user/signup`, // 1-1 账号管理-注册
  login: `${path}/webuser/login`, // 1-2 账号管理-登录
  reset: `${path}/user/doresetpassword`, // 1-8 账户管理-修改密码
  sendResetEmail: `${path}/user/resetpassword`, // 1-8 账户管理-修改密码
  getInfo: `${path}/webuser/getinfo`, // 1-7 账号管理-获取当前信息
  getInfoV2: `${path}/webuser/getinfowithoutins`, // 账号管理-获取当前信息(不包含ins信息)
  getInsInfo: `${path}/webuser/getinsinfo`, // 1-5 账号管理-ins账号信息获取
  setInsAccount: `${path}/user/setinsaccount`, // 1-4 账号管理-ins账号管理(绑定，删除，密码认证，修改ins账号)
  getInsPost: `${path}/webuser/getpost`, // 1-6 账号管理-获取post
  appConfig: `${path}/main/getappconfig`, // 6-3 其他-APP配置文档
  sharereward: `${path}/user/sharereward` // 6-3 账号管理-奖励查询
};
