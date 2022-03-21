// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取角色列表 GET /api/role */
export async function role(
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
  }>('/api/role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建角色 PUT /api/role/:id */
export async function updateRole(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(`/api/role/${data.id}`, {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建角色 POST /api/role */
export async function addRole(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/role', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除角色 DELETE /api/user */
export async function removeRole(data: { ids: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/role`, {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
