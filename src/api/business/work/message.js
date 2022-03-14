import request from '@/router/axios';

export const settleLogPage = (current, size, params) => {
  return request({
    url: `/api/business/work/settle/log`,
    method: 'get',
  })
}

export const eventCount = () => {
  return request({
    url: `/api/business/work/event`,
    method: 'get',
  })
}

export const messagePage = (current, size, params) => {
  return request({
    url: `/api/business/work/message/page`,
    method: 'get',
    params: {
      current,
      size,
      ...params
    }
  })
}
