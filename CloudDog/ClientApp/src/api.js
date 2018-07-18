import { GET, POST } from './lib/ajax';

export const globalApiUrl = 'http://hyncao.com';

// 上传图片
export const uploadPic = (pics) => POST(`${globalApiUrl}/api/data/upload`, pics);

// 图片列表
export const picList = (obj) => GET(`${globalApiUrl}/api/data/getlist`, obj);
