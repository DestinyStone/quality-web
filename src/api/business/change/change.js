import request from '@/router/axios';

export const lowChangePage = (current, size, params) => {
  return request({
    url: '/api/business/change/page',
    method: 'get',
    params: {
      current,
      size,
      ...params,
    }
  })
}

export const lowChangeQuality = () => {
  return request({
    url: '/api/business/change/quality',
    method: 'get',
  })
}

export const belongUserPage = (current, size, params) => {
  return request({
    url: '/api/business/change/belong/user/page',
    method: 'get',
    params: {
      current,
      size,
      ...params,
    }
  })
}

export const executionUserPage = (current, size, params, exclude) => {
  return request({
    url: '/api/business/change/execution/usr/page',
    method: 'post',
    params: {
      current,
      size,
      params,
      exclude
    }
  })
}


export const saveChange = (data) => {
  return request({
    url: '/api/business/change/save',
    method: 'post',
    data: data
  })
}

export const detailChange = (id) => {
  return request({
    url: '/api/business/change/detail',
    method: 'post',
    params: {
      id
    }
  })
}
