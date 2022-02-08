import request from '@/router/axios';

export const qprQuality = () => {
  return request({
    url: `/api/business/out/buy/qpr/quality`,
    method: 'get',
  })
}

export const checkConfirmPass = (id, data) => {
  return request({
    url: `/api/business/out/buy/qpr/approve/handler/check/confirm/${id}`,
    method: 'post',
    data: data
  })
}


export const checkSavePass = (id, data) => {
  return request({
    url: `/api/business/out/buy/qpr/approve/handler/check/save/${id}`,
    method: 'post',
    data: data
  })
}


export const qprPass = (id) => {
  return request({
    url: '/api/business/out/buy/qpr/approve/pass',
    method: 'get',
    params: {
      id,
    }
  })
}

export const qprDetail = (id) => {
  return request({
    url: '/api/business/out/buy/qpr/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const qprApprovePage = (current, size, params) => {
  return request({
    url: '/api/business/out/buy/qpr/approve/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}

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

export const approveOutBuyQprReject = (data) => {
  return request({
    url: '/api/business/out/buy/qpr/approve/reject',
    method: 'post',
    data: data
  })
}
