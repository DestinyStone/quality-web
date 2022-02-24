import request from '@/router/axios';

export const accountVersionCheckPage = (current, size, id) => {
  return request({
    url: `/api/business/check/account/version/page/${id}`,
    method: 'get',
    params: {
      current,
      size,
    }
  })
}

export const accountCheckPage = (current, size, params) => {
  return request({
    url: '/api/business/check/account/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const qualityCheck = () => {
  return request({
    url: '/api/business/check/quality',
    method: 'get',
  })
}

export const rejectApproveCheck = (data) => {
  return request({
    url: '/api/business/check/approve/reject',
    method: 'post',
    data: data,
  })
}


export const approveCheckQuality = () => {
  return request({
    url: '/api/business/check/approve/quality',
    method: 'get',
  })
}


export const downloadApprovePassCheck = (id, data) => {
  return request({
    url: '/api/business/check/approve/download/pass',
    method: 'post',
    params: {
      id
    },
    data: data,
  })
}

export const approvePassCheck = (id) => {
  return request({
    url: '/api/business/check/approve/pass',
    method: 'get',
    params: {
      id
    },
  })
}


export const getAccessSavePage = (current, size, params) => {
  return request({
    url: '/api/business/check/access/save/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const detailCheck = (id) => {
  return request({
    url: '/api/business/check/detail',
    method: 'get',
    params: {
      id
    }
  })
}


export const pageCheck = (current, size, params) => {
  return request({
    url: '/api/business/check/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const pageCheckApprove = (current, size, params) => {
  return request({
    url: '/api/business/check/approve/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const saveCheck = (data) => {
  return request({
    url: '/api/business/check/save',
    method: 'post',
    data: data,
  })
}

export const updateCheck = (id, data) => {
  return request({
    url: `/api/business/check/update/${id}`,
    method: 'post',
    data: data,
  })
}
