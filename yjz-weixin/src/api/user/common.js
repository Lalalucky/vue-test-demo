
import http from '@/plugins/axios/index.js';

// -----------------------------------------------
// 一些公共的接口
// 
//  ----  uploadPicAPI： 上传图片
// -----------------------------------------------
// 
// 上传图片接口
export const uploadPicAPI = params => {
  return http(`/oa-console/back/user/upload_pic.do`, params , {
    type : 'file'
  }).then(res => res);
};



