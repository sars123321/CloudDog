import { GET, POST } from './lib/ajax';

const globalApiUrl = 'http://localhost:51459';

// 请求地址是相对/src目录的
export const uploadPic = (pics) => POST(`${globalApiUrl}/api/data/upload`, {pics})
