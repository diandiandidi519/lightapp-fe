import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { ProFormText, ProFormTextArea, ModalForm } from '@ant-design/pro-form';

import type { ProFormInstance } from '@ant-design/pro-form';
import { addRole, updateRole } from '../service';
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
    await addRole({ ...fields });
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
    await updateRole({
      ...currentRow,
      ...fields,
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

  useEffect(() => {
    if (props.updateModalVisible) {
      if (props.values.id) {
        formRef.current?.setFieldsValue(props.values);
      } else {
        formRef.current?.resetFields();
      }
    }
  }, [props.updateModalVisible, props.values]);
  return (
    <ModalForm
      visible={props.updateModalVisible}
      title={props?.values?.id ? '编辑角色' : '新增角色'}
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
        name="rolename"
        label="名称"
        width="md"
        rules={[
          {
            required: true,
            message: '请输入角色名称！',
          },
        ]}
      />
      <ProFormTextArea name="desc" width="md" label="描述" placeholder="请输入" />
      <ProFormText name="order" label="排序" width="md" />
    </ModalForm>
  );
};

export default UpdateForm;
