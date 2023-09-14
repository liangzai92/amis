/**
 * @file 组件选项组件的可视化编辑控件
 */
import React from 'react';
import Sortable from 'sortablejs';
import type {Option} from 'amis';
import {FormControlProps} from 'amis-core';
import type {SchemaApi} from 'amis';
export type valueType = 'text' | 'boolean' | 'number';
export interface PopoverForm {
  optionLabel: string;
  optionValue: any;
  optionValueType: valueType;
}
export type OptionControlItem = Option & {
  checked: boolean;
};
export interface OptionControlProps extends FormControlProps {
  className?: string;
}
export type SourceType = 'custom' | 'api' | 'apicenter' | 'variable';
export interface OptionControlState {
  options: Array<OptionControlItem>;
  api: SchemaApi;
  labelField: string;
  valueField: string;
  source: SourceType;
}
export default class OptionControl extends React.Component<
  OptionControlProps,
  OptionControlState
> {
  sortable?: Sortable;
  drag?: HTMLElement | null;
  target: HTMLElement | null;
  $comp: string;
  internalProps: string[];
  constructor(props: OptionControlProps);
  /**
   * 数据更新
   */
  componentWillReceiveProps(nextProps: OptionControlProps): void;
  /**
   * 获取当前选项值的类型
   */
  getOptionValueType(value: any): valueType;
  /**
   * 将当前选项值转换为选择的类型
   */
  normalizeOptionValue(
    value: any,
    valueType: valueType
  ): string | number | boolean;
  /**
   * 处理填入输入框的值
   */
  transformOptionValue(value: any): string;
  transformOptions(props: OptionControlProps): {
    hiddenOn?: any;
    hidden?: any;
    badge?: any;
    label: any;
    value: any;
    checked: boolean;
  }[];
  /**
   * 处理当前组件的默认值
   */
  normalizeValue(): any;
  /**
   * 更新options字段的统一出口
   */
  onChange(): void;
  targetRef(ref: any): void;
  dragRef(ref: any): void;
  initDragging(): void;
  destroyDragging(): void;
  scroll2Bottom(): void;
  /**
   * 切换选项类型
   */
  handleSourceChange(source: SourceType): void;
  /**
   * 删除选项
   */
  handleDelete(index: number): void;
  /**
   * 设置默认选项
   */
  handleToggleDefaultValue(index: number, checked: any, shift?: boolean): void;
  /**
   * 编辑选项
   */
  toggleEdit(index: number): void;
  /**
   * 编辑角标
   */
  toggleBadge(index: number, value: string): void;
  handleEditLabel(index: number, value: string): void;
  handleHiddenValueChange(index: number, value: string): void;
  handleAdd(): void;
  handleValueTypeChange(index: number, type: valueType): void;
  handleValueChange(index: number, value: string): void;
  handleBatchAdd(
    values: {
      batchOption: string;
    }[],
    action: any
  ): void;
  renderHeader(): React.JSX.Element;
  renderOption(props: any): React.JSX.Element;
  buildBatchAddSchema(): {
    type: string;
    actionType: string;
    label: string;
    dialog: {
      title: string;
      headerClassName: string;
      closeOnEsc: boolean;
      closeOnOutside: boolean;
      showCloseButton: boolean;
      onConfirm: (
        values: {
          batchOption: string;
        }[],
        action: any
      ) => void;
      body: (
        | {
            type: string;
            level: string;
            body: {
              type: string;
              tpl: string;
            }[];
            showIcon: boolean;
            className: string;
            wrapWithPanel?: undefined;
            mode?: undefined;
            wrapperComponent?: undefined;
            resetAfterSubmit?: undefined;
            autoFocus?: undefined;
            preventEnterSubmit?: undefined;
            horizontal?: undefined;
          }
        | {
            type: string;
            wrapWithPanel: boolean;
            mode: string;
            wrapperComponent: string;
            resetAfterSubmit: boolean;
            autoFocus: boolean;
            preventEnterSubmit: boolean;
            horizontal: {
              left: number;
              right: number;
            };
            body: {
              name: string;
              type: string;
              label: string;
              placeholder: string;
              trimContents: boolean;
              minRows: number;
              maxRows: number;
              required: boolean;
            }[];
            level?: undefined;
            showIcon?: undefined;
            className?: undefined;
          }
      )[];
    };
  };
  handleAPIChange(source: SchemaApi): void;
  handleLableFieldChange(labelField: string): void;
  handleValueFieldChange(valueField: string): void;
  renderApiPanel(): any;
  render(): React.JSX.Element;
}
export declare class OptionControlRenderer extends OptionControl {}
