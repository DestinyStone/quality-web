import request from '@/router/axios';

export const versionPage = (resourceId, resourceType, current, size) => {
  return request({
    url: '/api/business/di/version/page',
    method: 'get',
    params: {
      current,
      size,
      resourceId,
      resourceType
    }
  })
}

export const reReportDi = (id, data) => {
  return request({
    url: `/api/business/di/re/report/${id}`,
    method: 'post',
    data: data
  })
}

export const reportReject = (data) => {
  return request({
    url: `/api/business/di/approve/reject`,
    method: 'post',
    data: data
  })
}

export const reportPass = (id) => {
  return request({
    url: `/api/business/di/approve/pass`,
    method: 'get',
    params: {
      id
    }
  })
}


export const reportTaskPassApprove = (id, data) => {
  return request({
    url: `/api/business/di/approve/task/pass/${id}`,
    method: 'post',
    data: data
  })
}

export const reportApproveQuality = () => {
  return request({
    url: '/api/business/di/approve/quality',
    method: 'get',
  })
}

export const reportApprovePage = (current, size, params) => {
  return request({
    url: '/api/business/di/approve/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}


export const reportQuality = () => {
  return request({
    url: `/api/business/di/report/quality`,
    method: 'get',
  })
};

export const reportDetail = (id) => {
  return request({
    url: `/api/business/di/report/detail`,
    method: 'get',
    params: {
      id
    }
  })
};

export const reportDi = (id, data) => {
  return request({
    url: `/api/business/di/report/${id}`,
    method: 'post',
    data: data
  })
}

export const diSelfBack = (id) => {
  return request({
    url: `/api/business/di/self/back`,
    method: 'get',
    params: {
      id
    }
  })
}


export const unReportDi = (id, remark) => {
  return request({
    url: `/api/business/di/un/report/${id}`,
    method: 'get',
    params: {
      remark
    }
  })
}

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

export const reportDiAccountPage = (current, size, params) => {
  return request({
    url: '/api/business/di/report/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}

export const awaitReportDiAccountPage = (current, size, params) => {
  return request({
    url: '/api/business/di/await/report/page',
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}
