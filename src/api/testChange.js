import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/testChange',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/testChange/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/testChange',
    method: 'put',
    data
  })
}

export function queryByStation(params) {
  return request({
    url: 'api/testChange/query_by_station' + '?' + 'stationName=' + params,
    method: 'get'
  })
}

export default { add, edit, del }
