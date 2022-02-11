import request from '@/router/axios';

export const messagePage = (current, size, params) => {
  return request({
    url: `/api/business/message/page`,
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}
