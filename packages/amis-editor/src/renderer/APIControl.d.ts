import React from 'react';
import type {SchemaObject, SchemaCollection, SchemaApi} from 'amis';
import type {Api} from 'amis';
import type {FormControlProps} from 'amis-core';
import type {ActionSchema} from 'amis';
export type ApiObject = Api & {
  messages?: Record<
    | 'fetchSuccess'
    | 'fetchFailed'
    | 'saveOrderSuccess'
    | 'saveOrderFailed'
    | 'quickSaveSuccess'
    | 'quickSaveFailed',
    string
  >;
};
export interface APIControlProps extends FormControlProps {
  name?: string;
  label?: string;
  value?: any;
  /**
   * 开启debug模式
   */
  debug?: boolean;
  /**
   * 接口消息设置描述信息
   */
  messageDesc?: string;
  /**
   * 顶部按钮集合
   */
  actions?: Array<ActionSchema>;
  /**
   * 底部集合
   */
  footer?: Array<SchemaObject>;
  /**
   * 是否开启选择模式，开启后actions属性失效
   */
  enablePickerMode?: boolean;
  /**
   * 触发Picker的按钮配置
   */
  pickerBtnSchema?: ActionSchema;
  /**
   * picker标题
   */
  pickerTitle?: string;
  /**
   * Picker绑定的Name
   */
  pickerName?: string;
  /**
   * picker模式的Schema
   */
  pickerSchema?: SchemaCollection;
  /**
   * Picker数据源
   */
  pickerSource?: SchemaApi;
  /**
   * Picker弹窗大小
   */
  pickerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Picker顶部的CSS类名
   */
  pickerHeaderClassName?: string;
  /**
   * 是否只返回内部TabsPanel
   */
  onlyTabs?: boolean;
  /**
   * 开启高亮显示
   */
  enableHighlight?: boolean;
  /**
   * Picker选项的label字段
   */
  labelField?: string;
  /**
   * 检索字段
   */
  searchField?: string;
  /**
   * 检索字段类型
   */
  searchType?: string;
  /**
   * 底部区域CSS类名
   */
  footerClassName?: string;
  /**
   * Picker面板确认
   */
  onPickerConfirm: (values: any) => void | any;
  /**
   * Picker面板关闭
   */
  onPickerClose: () => void;
  /**
   * Picker面板选择
   */
  onPickerSelect: (values: any) => void | any;
  onAction: (
    schema: ActionSchema,
    e: React.MouseEvent<any> | void | null,
    action: object,
    data: any
  ) => void;
}
export interface APIControlState {
  apiStr: string;
  selectedItem?: any[];
  schema?: SchemaCollection;
  loading: boolean;
}
export default class APIControl extends React.Component<
  APIControlProps,
  APIControlState
> {
  input?: HTMLInputElement;
  static defaultProps: Pick<
    APIControlProps,
    'pickerBtnSchema' | 'labelField' | 'searchType'
  >;
  constructor(props: APIControlProps);
  componentDidMount(): void;
  componentDidUpdate(prevProps: APIControlProps): void;
  /**
   * 已选API详情，因为list接口是分页的，所以需要单独调用一次
   */
  updatePickerOptions(): Promise<void>;
  transformApi2Str(value: any): string;
  fetchOptions(keyword?: string): Promise<void>;
  inputRef(ref: any): void;
  focus(): void;
  clearPickerValue(): void;
  handleSimpleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSubmit(values: SchemaApi, action?: 'input' | 'picker-submit'): void;
  handleAction(
    schema: ActionSchema,
    e: React.MouseEvent<any> | void | null,
    action: object,
    data: any
  ): void;
  normalizeValue(value: any, callback: (value: any) => any): any;
  handlePickerConfirm(value: any): void;
  handlePickerClose(): void;
  renderHeader(): React.JSX.Element;
  renderPickerSchema(): React.JSX.Element | null;
  renderApiDialog(): {
    label: string;
    type: string;
    acitonType: string;
    size: string;
    icon: React.JSX.Element;
    className: string;
    actionType: string;
    dialog: {
      title: string;
      size: string;
      className: string;
      headerClassName: string;
      bodyClassName: string;
      closeOnEsc: boolean;
      closeOnOutside: boolean;
      showCloseButton: boolean;
      body: {
        type: string;
        className: string;
        mode: string;
        submitOnChange: boolean;
        wrapWithPanel: boolean;
        onSubmit: (
          values: SchemaApi,
          action?: 'input' | 'picker-submit' | undefined
        ) => void;
        debug: boolean;
        body: {
          type: string;
          className: string;
          contentClassName: string;
          tabs: {
            title: string;
            tab: any[];
          }[];
        }[];
      }[];
    };
  };
  renderApiConfigTabs(submitOnChange?: boolean): {
    type: string;
    className: string;
    mode: string;
    submitOnChange: boolean;
    wrapWithPanel: boolean;
    onSubmit: (
      values: SchemaApi,
      action?: 'input' | 'picker-submit' | undefined
    ) => void;
    debug: boolean;
    body: {
      type: string;
      className: string;
      contentClassName: string;
      tabs: {
        title: string;
        tab: any[];
      }[];
    }[];
  };
  render(): React.JSX.Element;
}
export declare class APIControlRenderer extends APIControl {}
