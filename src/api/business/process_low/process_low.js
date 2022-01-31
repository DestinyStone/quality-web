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

export const processLowEditCheck = (id, bpmId, data) => {
  return request({
    url: `/api/business/process/low/edit/check/${id}/${bpmId}`,
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


