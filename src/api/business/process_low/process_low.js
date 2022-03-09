import request from '@/router/axios';

export const processLowAccountPage= (current, size, params) => {
  return request({
    url: '/api/business/process/low/account/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}

export const processLowApproveReSubmit= (id, data) => {
  return request({
    url: `/api/business/process/low/re/submit/${id}`,
    method: 'post',
    data: data
  })
}
export const processLowApprovePass= (id) => {
  return request({
    url: '/api/business/process/low/approve/pass',
    method: 'get',
    params: {
      id
    }
  })
}

export const processLowSelfBack = (id) => {
  return request({
    url: '/api/business/process/low/self/back',
    method: 'get',
    params: {
      id
    }
  })
}

export const processLowApprovePage = (current, size, params) => {
  return request({
    url: '/api/business/process/low/approve/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
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

export const processLowDetail = (id) => {
  return request({
    url: '/api/business/process/low/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const processLowEditCheck = (id, data) => {
  return request({
    url: `/api/business/process/low/edit/check/${id}`,
    method: 'post',
    data: data
  })
}

export const approveReject = (data) => {
  return request({
    url: '/api/business/process/low/approve/reject',
    method: 'post',
    data: data
  })
}

export const processLowQuality = () => {
  return request({
    url: '/api/business/process/low/quality',
    method: 'get',
  })
}


export const processLowApproveQuality = () => {
  return request({
    url: '/api/business/process/low/approve/quality',
    method: 'get',
  })
}
