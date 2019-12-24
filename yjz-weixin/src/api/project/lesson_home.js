import http from '@/plugins/axios/index.js';

/*

 lesson相关的接口

*/

/**课程
 *
 */
//多条件查询课程
export const selectLessonByName = params => {
  return http(`/lt-order/wechat/logonless/select_lesson_byname_page.do`, params).then(res => res);
};

// 根据Id查询课程详情
export const selectLessonById = params => {
  return http(`/lt-order/wxLessonInfo/logonless/selelctLessonInfo.do`, params, { method: 'GET' }).then(res => res);
};
// 根据Id查询课程目录
// export const selectLessonMenuById = params => {
//   return http(`/lt-order/logonless/select_PcSubLesson_byLessonId.do`, params, { method: 'GET' }).then(res => res);
// };

export const selectLessonMenuById = params => {
  return http(`/lt-order/logonless/select_wxSubLesson_byLessonId.do`, params, { method: 'GET' }).then(res => res);
};
//分页查询最新活动
export const selectActivityByPage = params => {
  return http(`/lt-order/wechat/logonless/selectActivitiesByPage.do`, params).then(res => res);
};
//单个分节课程视频查询
// export const selectSubLessonById = params => {
//   return http(`/lt-order/select_subLesson_video.do`, params, { method: 'GET' }).then(res => res);
// };

export const selectSubLessonById = params => {
  return http(`/lt-order/select_wxsubLesson_video.do`, params, { method: 'GET' }).then(res => res);
};

//微信端查询用户评价平均等级评分
export const selectAverageScoreById = params => {
  return http(`/lt-order/wechat/logonless/selectAverageScore.do`, params, { method: 'GET' }).then(res => res);
};
//微信端分页查询用户评价
export const selectCommentsByPage = params => {
  return http(`/lt-order/wechat/logonless/selectLessonCommentByPage.do`, params).then(res => res);
};
//收藏课程以及取消收藏
export const collectLesson = params => {
  return http(`/lt-order/collect_lesson.do`, params, { method: 'GET' }).then(res => res);
};
//点赞
export const getLessonLiked = params => {
  return http(`/lt-order/get_like_lesson.do`, params,{method:'GET'}).then(res => res);
};
//根据分节课程id查询视频信息(首页免费的)
// export const selectVideoForFree = params => {
//   return http(`/lt-order/logonless/select_subLesson_free_video.do`, params,{method:'GET'}).then(res => res);
// };


export const selectVideoForFree = params => {
  return http(`/lt-order/logonless/select_subLesson_wxfree_video.do`, params,{method:'GET'}).then(res => res);
};


//查询专家推荐课程
export const selectProfessorLessons = params => {
  return http(`/lt-order/wechat/logonless/selectProfessorRecoLessons.do`, params,{method:'GET'}).then(res => res);
};
//根据videoId获取playauth
export const selectVideoAuth = params => {
  return http(`/lt-order/logonless/select_video_token.do`, params,{method:'GET'}).then(res => res);
};
//微信端用户点赞
export const addCommentLike = params => {
  return http(`/lt-order/wechat/addCommentLike.do`, params,{method:'GET'}).then(res => res);
};
//微信端用户新建评价
export const addLessonComment = params => {
  return http(`/lt-order/wechat/addLessonComment.do`, params).then(res => res);
};