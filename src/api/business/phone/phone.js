import request from '@/router/axios';

advicePhone
export const advicePhone = (id) => {
  return request({
    url: `/api/business/phone-template/advice`,
    method: 'post',
    params: {
      id
    },
  })
}


export const testPhone = (id, data) => {
  return request({
    url: `/api/business/phone-template/test`,
    method: 'post',
    params: {
      id
    },
    data: data,
  })
}

export const enablePhoneStatus = (ids, status) => {
  return request({
    url: `/api/business/phone-template/enable/${status}`,
    method: 'get',
    params: {
      ids
    }
  })
}

export const detailPhone = (id) => {
  return request({
    url: '/api/business/phone-template/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const updatePhone = (id, data) => {
  return request({
    url: `/api/business/phone-template/update/${id}`,
    method: 'post',
    data: data
  })
}

export const savePhone = (data) => {
  return request({
    url: '/api/business/phone-template/save',
    method: 'post',
    data: data
  })
}

export const phonePage = (current, size, params) => {
  return request({
    url: '/api/business/phone-template/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
