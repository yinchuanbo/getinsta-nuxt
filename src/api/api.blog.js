const path = 'frontend/blog';
export default {
  getBlogCategory: `${path}/getsorts`, // 3-2 blog管理-获取分类
  getBlogList: `${path}/getarticles`, // 3-1 blog管理-获取文章列表
  getBlogDetail: `${path}/getcontent`, // 3-3 blog管理-获取文章详情
  getHotBlogList: `${path}/gethotarticles`, // 3-4 blog管理-获取热门文章
};
