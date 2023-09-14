/**
 * @file 校验项
 */
import React from 'react';
import {Validator} from '../validator';
export type ValidatorData = {
  name: string;
  value?: any;
  message?: string;
  isBuiltIn?: boolean;
};
export interface ValidationItemProps {
  /**
   * 组件的CSS主题前缀
   */
  classPrefix?: string;
  /**
   * 校验配置
   */
  data: ValidatorData;
  /**
   * 是否是默认props，默认可开关
   */
  isDefault: boolean;
  validator: Validator;
  onEdit?: (data: ValidatorData) => void;
  onDelete?: (name: string) => void;
  onSwitch?: (checked: boolean, data?: ValidatorData) => void;
}
interface ValidationItemState {
  value: string | number | boolean | undefined;
  checked: boolean;
  message: string;
  isBuiltIn: boolean | undefined;
}
export default class ValidationItem extends React.Component<
  ValidationItemProps,
  ValidationItemState
> {
  validator: Validator;
  constructor(props: ValidationItemProps);
  handleEdit(value: any, action: any): void;
  handleDelete(): void;
  handleSwitch(checked: boolean): void;
  renderActions(): React.JSX.Element | null;
  renderInputControl(): React.JSX.Element | null;
  render(): React.JSX.Element;
}
export {};
