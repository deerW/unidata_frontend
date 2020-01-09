import request from '@/utils/request'

export function getTodoList(params) {
  return request({
    url: '/todos',
    method: 'get',
    headers: { 'Cache-Control': 'no-cache' },
    params
  })
}

export function postNewTodo(params, data) {
  return request({
    url: '/todos',
    method: 'post',
    params,
    data
  })
}

export function putTodoChange(id, data) {
  return request({
    url: `/todos/${id}`,
    method: 'put',
    data
  })
}
