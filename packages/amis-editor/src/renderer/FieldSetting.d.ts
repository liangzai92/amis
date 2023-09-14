/**
 * @file FieldSetting.tsx
 * @desc 脚手架中字段管理
 */
import React from 'react';
import {FormControlProps} from 'amis-core';
import type {IReactionDisposer} from 'mobx';
import type {DSFeatureType, ScaffoldField} from '../builder/type';
interface FieldSettingProps extends FormControlProps {
  /** 脚手架渲染类型 */
  renderer?: string;
  feat: DSFeatureType;
  config: {
    showInputType?: boolean;
    showDisplayType?: boolean;
  };
  onAutoGenerateFields: (params: {
    api: any;
    props: FieldSettingProps;
    setState: (state: any) => void;
  }) => Promise<any[]>;
}
interface RowData extends ScaffoldField {}
export declare class FieldSetting extends React.Component<
  FieldSettingProps,
  {
    loading: boolean;
  }
> {
  static defaultProps: {
    config: {
      showInputType: boolean;
      showDisplayType: boolean;
    };
  };
  static validator: (items: RowData[], isInternal?: boolean) => string | false;
  reaction: IReactionDisposer;
  dom: HTMLElement;
  formRef: React.RefObject<{
    submit: () => Promise<Record<string, any>>;
  }>;
  tableRef: React.RefObject<any>;
  scaffold: RowData;
  constructor(props: FieldSettingProps);
  componentDidMount(): void;
  componentWillUnmount(): void;
  handleColumnBlur(): void;
  handleSubmit(data: {items: RowData[]}): void;
  handleGenerateFields(e: React.MouseEvent<any>): Promise<void>;
  handleFieldsChange(fields: RowData[]): void;
  renderFooter(): React.JSX.Element | null;
  render(): React.JSX.Element;
}
export default class FieldSettingRenderer extends FieldSetting {}
export {};
