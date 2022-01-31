import request from '@/router/axios';

export const approvePutOf = (data) => {
  return request({
    url: '/api/business/process/put/of',
    method: 'post',
    data: data
  })
}
