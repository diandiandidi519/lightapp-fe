// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取角色列表 GET /api/users */
export async function user(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: {
      list: TableListItem[];
      /** 列表的内容总数 */
      count?: number;
    };

    errno?: number;
  }>('/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建角色 PUT /api/users/:id */
export async function updateUser(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(`/api/users/${data.id}`, {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建角色 POST /api/users */
export async function addUser(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/users', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除角色 DELETE /api/rule */
export async function removeUser(data: { ids: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/users`, {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
