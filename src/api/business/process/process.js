import request from '@/router/axios';

export const approveProcessLowQprSave = (id, data) => {
  return request({
    url: `/api/business/process/low/approve/handler/qpr/save/${id}`,
    method: 'post',
    data: data,
  })
}

export const approveList = (busId) => {
  return request({
    url: '/api/business/process/list',
    method: 'get',
    params: {
      busId
    }
  })
}


export const approvePutOf = (data) => {
  return request({
    url: '/api/business/process/put/of',
    method: 'post',
    data: data
  })
}

export const approveUrgeSave = (data) => {
  return request({
    url: '/api/business/process/urge/save',
    method: 'post',
    data: data
  })
}

export const approveUrgeList = (bpmId, query) => {
  return request({
    url: `/api/business/process/urge/list/${bpmId}`,
    method: 'get',
    params: {
      ...query
    }
  })
}

export const approveLogList = (bpmId, query) => {
  return request({
    url: `/api/business/process/log/list/${bpmId}`,
    method: 'get',
    params: {
      ...query
    }
  })
}
