import { TableListItem as RoleItem } from '../role/data.d';
export type TableListItem = {
  id: number;
  username: string;
  phoneNumber: string;
  nickName: string;
  gender: string;
  city: string;
  picture: string;
  latestLoginAt: Date;
  updatedAt: Date;
  createdAt: Date;
  roles: RoleItem[];
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  id?: number;
  username?: string;
  phoneNumber?: string;
  nickName?: string;
  gender?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
