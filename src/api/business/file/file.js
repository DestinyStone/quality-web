import request from '@/router/axios';

export const downloadFile = (id) => {
  return request({
    url: '/api/business/file/download',
    method: 'get',
    params: {
      id
    },
    blob: 'blob',
  })
}

export const uploadFile = (data) => {
  return request({
    url: '/api/business/file/upload',
    method: 'post',
    data: data
  })
}

export const detailFile = (id) => {
  return request({
    url: '/api/business/file/detail',
    method: 'get',
    params: {
      id
    }
  })
}

