import request from '@/router/axios';

export const diAccountPage = (current, size, params) => {
  return request({
    url: '/api/business/di/account/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}
