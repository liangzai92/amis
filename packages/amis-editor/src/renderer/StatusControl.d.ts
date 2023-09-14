/**
 * @file 状态配置组件
 */
import React from 'react';
import {Option} from 'amis';
import type {FormControlProps} from 'amis-core';
import type {SchemaCollection} from 'amis';
import type {FormSchema} from '../../../amis/src/Schema';
export interface StatusControlProps extends FormControlProps {
  name: string;
  expressionName: string;
  trueValue?: boolean;
  falseValue?: boolean;
  options?: Option[];
  children?: SchemaCollection;
  messages?: Pick<FormSchema, 'messages'>;
  noBulkChange?: boolean;
  noBulkChangeData?: any;
  onDataChange?: (value: any) => void;
}
type StatusFormData = {
  statusType: number;
  expression: string;
};
interface StatusControlState {
  checked: boolean;
  formData: StatusFormData;
}
export declare class StatusControl extends React.Component<
  StatusControlProps,
  StatusControlState
> {
  static defaultProps: {
    trueValue: boolean;
    falseValue: boolean;
  };
  constructor(props: StatusControlProps);
  initState(): {
    checked: boolean;
    formData: StatusFormData;
  };
  shouldComponentUpdate(
    nextProps: StatusControlProps,
    nextState: StatusControlState
  ): boolean;
  handleSwitch(value: boolean): void;
  handleFormSubmit(values: StatusFormData): void;
  render(): React.JSX.Element;
  renderContent(): React.JSX.Element;
}
export declare class StatusControlRenderer extends StatusControl {}
export {};
