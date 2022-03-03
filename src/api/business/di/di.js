import request from '@/router/axios';

export const diConfigDetail = (resourceId, resourceType) => {
  return request({
    url: '/api/business/di/detail',
    method: 'get',
    params: {
      resourceId, resourceType
    }
  })
}

export const diAccountSubmit = (data) => {
  return request({
    url: '/api/business/di/submit',
    method: 'post',
    data: data
  })
}

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
