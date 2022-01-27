import request from '@/router/axios';

export const processLowSelfBack = (id) => {
  return request({
    url: '/api/business/process/low/self/back',
    method: 'get',
    params: {
      id
    }
  })
}

export const processLowPage = (current, size, params) => {
  return request({
    url: '/api/business/process/low/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}

export const processLowSave = (data) => {
  return request({
    url: '/api/business/process/low/save',
    method: 'post',
    data: data
  })
}
