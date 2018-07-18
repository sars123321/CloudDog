import { GET, POST } from './lib/ajax';

const globalApiUrl = 'http://localhost:51459';

// 上传图片
export const uploadPic = (pics) => POST(`${globalApiUrl}/api/data/upload`, pics);

// 图片列表
export const picList = (obj) => POST(`${globalApiUrl}/api/data/getlist`, obj);
