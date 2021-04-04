import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/stationDevicesInfo',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/stationDevicesInfo/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/stationDevicesInfo',
    method: 'put',
    data
  })
}

export function importBatch(data) {
  return request({
    url: 'api/stationDevicesInfo',
    method: 'post',
    data
  })
}

export default { add, edit, del }
