import request from '@/router/axios';

export const emailPage = (current, size, params) => {
  return request({
    url: '/api/business/email-template/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
