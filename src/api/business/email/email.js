import request from '@/router/axios';

export const enableEmailStatus = (ids, status) => {
  return request({
    url: `/api/business/email-template/enable/${status}`,
    method: 'get',
    params: {
      ids
    }
  })
}

export const detailEmail = (id) => {
  return request({
    url: '/api/business/email-template/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateEmail = (id, data) => {
  return request({
    url: `/api/business/email-template/update/${id}`,
    method: 'post',
    data: data
  })
}

export const saveEmail = (data) => {
  return request({
    url: '/api/business/email-template/save',
    method: 'post',
    data: data
  })
}

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
