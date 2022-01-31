import request from '@/router/axios';

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

