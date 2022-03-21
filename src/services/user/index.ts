// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

import type { MenuDataItem } from '@umijs/route-utils';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: User.CurrentUser;
  }>('/api/users/getUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/loginByPhoneNumber */
export async function loginByPhoneNumber(body: User.LoginParams, options?: { [key: string]: any }) {
  return request<User.LoginResult>('/api/users/loginByPhoneNumber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/loginByAccount */
export async function loginByAccount(body: User.LoginParams, options?: { [key: string]: any }) {
  return request<User.LoginResult>('/api/users/loginByAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function fetchMenuData(options?: { [key: string]: any }) {
  return request<{ errno: number; data: MenuDataItem[] }>('/api/permission/getPermission', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phoneNumber?: string;
  },
  options?: { [key: string]: any },
) {
  return request<User.FakeCaptcha>('/api/users/genVeriCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
