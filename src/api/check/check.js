import request from '@/router/axios';

export const getAccessSavePage = (current, size, params) => {
  return request({
    url: '/api/business/check/access/save/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const saveCheck = (data) => {
  return request({
    url: '/api/business/check/save',
    method: 'post',
    data: data,
  })
}
