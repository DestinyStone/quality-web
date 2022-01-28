import request from '@/router/axios';

export const qprPage = (current, size, params) => {
  return request({
    url: '/api/business/out/buy/qpr/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}


export const qprSave = (data) => {
  return request({
    url: '/api/business/out/buy/qpr/save',
    method: 'post',
    data: data
  })
}
