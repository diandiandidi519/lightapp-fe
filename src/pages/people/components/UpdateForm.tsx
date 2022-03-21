import React, { useEffect, useRef } from 'react';
import { Button, message, Input, Drawer } from 'antd';
import { ProFormText, ProFormTextArea, ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { ProFormInstance } from '@ant-design/pro-form';
import { addUser, updateUser } from '../service';
import { role } from '@/pages/role/service';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: Partial<TableListItem>) => {
  const hide = message.loading('正在配置');

  try {
    await updateUser({
      ...fields,
      id: currentRow?.id,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<ProFormInstance<TableListItem>>();

  const { data: roleList } = useRequest(role);

  console.log(roleList);

  useEffect(() => {
    if (props.updateModalVisible) {
      if (props.values.id) {
        formRef.current?.setFieldsValue({
          ...props.values,
          roles: props.values?.roles?.map((item) => item.id) ?? [],
        });
      } else {
        formRef.current?.resetFields();
      }
    }
  }, [props.updateModalVisible, props.values]);
  return (
    <ModalForm
      visible={props.updateModalVisible}
      title={props?.values?.id ? '编辑用户' : '新增用户'}
      width={640}
      formRef={formRef}
      onFinish={async (values) => {
        let success;
        if (props.values?.id) {
          success = await handleUpdate(values, props.values);
        } else {
          success = await handleAdd(values as TableListItem);
        }
        if (success) {
          props.onSuccess();
        }
      }}
      modalProps={{
        onCancel: props.onCancel,
      }}
    >
      <ProFormText
        name="username"
        label="名称"
        width="md"
        rules={[
          {
            required: true,
            message: '请输入用户名称！',
          },
        ]}
      />
      <ProFormText
        name="phoneNumber"
        label="手机号"
        width="md"
        rules={[
          {
            required: true,
            message: '请输入手机号！',
          },
        ]}
      />
      <ProFormSelect
        mode="multiple"
        options={
          roleList?.list.map((item) => ({ ...item, label: item.rolename, value: item.id })) ?? []
        }
        width="md"
        name="roles"
        label="关联的角色"
        rules={[
          {
            required: true,
            message: '请选择角色',
          },
        ]}
      />
      <ProFormText
        name="nickName"
        label="昵称"
        width="md"
        rules={[
          {
            required: true,
            message: '请输入昵称！',
          },
        ]}
      />
      <ProFormSelect
        options={[
          {
            value: '0',
            label: '保密',
          },
          {
            value: '1',
            label: '男',
          },
          {
            value: '2',
            label: '女',
          },
        ]}
        width="md"
        name="gender"
        label="性别"
        rules={[
          {
            required: true,
            message: '请选择性别',
          },
        ]}
      />
      <ProFormText name="city" label="城市" width="md" />
      <ProFormText name="picture" label="头像" width="md" />
    </ModalForm>
  );
};

export default UpdateForm;
