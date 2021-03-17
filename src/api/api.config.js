const isProduction = process.env.NODE_ENV === 'production';

const productionDomain = '';
const devDomain = '/dev';
const proxyDomain = process.env.VUE_APP_ProxyTarget;
const path = process.env.VUE_APP_ApiPath + '/api/';

export default {
  devURL: devDomain + path,
  proxyURL: proxyDomain + path,
  productionURL: productionDomain + path,
  baseDomain: isProduction ? productionDomain : devDomain,
  baseURL: (isProduction ? productionDomain : devDomain) + path,
  headers: { 'Content-Type': 'application/json' },
  // timeout: 60000,
  timeout: 120000
};
