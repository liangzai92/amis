/**
 * @file 开关 + 更多编辑组合控件
 * 使用时需关注所有的配置项是一个object还是整个data中，可使用bulk来区分
 *
 */
import React from 'react';
import type {Action} from 'amis';
import type {SchemaCollection} from 'amis';
import type {IScopedContext} from 'amis-core';
import type {FormSchema} from 'amis';
import type {FormControlProps} from 'amis-core';
export interface SwitchMoreProps extends FormControlProps {
  className?: string;
  form?: Omit<FormSchema, 'type'>;
  formType: 'extend' | 'dialog' | 'pop';
  body?: SchemaCollection;
  rootClose?: boolean;
  autoFocus?: boolean;
  overlay?: boolean;
  container?: HTMLElement | (() => HTMLElement);
  target?: React.ReactNode | Function;
  trueValue?: any;
  falseValue?: any;
  removable?: boolean;
  hiddenOnDefault?: boolean;
  bulk?: boolean;
  onRemove?: (e: React.UIEvent<any> | void) => void;
  onClose: (e: React.UIEvent<any> | void) => void;
  clearChildValuesOnOff?: boolean;
  defaultData?: any;
  isChecked?: (options: {
    data: any;
    value: any;
    name?: string;
    bulk?: boolean;
  }) => boolean;
}
interface SwitchMoreState {
  /**
   * 是否展示更多编辑内容
   */
  show: boolean;
  /**
   * 是否开启编辑
   */
  checked: boolean;
}
export default class SwitchMore extends React.Component<
  SwitchMoreProps,
  SwitchMoreState
> {
  static defaultProps: Pick<
    SwitchMoreProps,
    | 'container'
    | 'autoFocus'
    | 'overlay'
    | 'rootClose'
    | 'trueValue'
    | 'falseValue'
    | 'formType'
    | 'bulk'
    | 'clearChildValuesOnOff'
  >;
  overlay: HTMLElement | null;
  formNames: null | Array<string>;
  constructor(props: SwitchMoreProps);
  initState(): {
    checked: boolean;
    show: boolean;
  };
  getFormItemNames(): any[];
  overlayRef(ref: any): void;
  openPopover(): void;
  toogleExtend(): void;
  closePopover(): void;
  handleDelete(e: React.UIEvent<any> | void): void;
  handleSwitchChange(checked: boolean): void;
  handleSubmit(values: any): void;
  handleAction(
    e: React.UIEvent<any> | void,
    action: Action,
    data: object,
    throwErrors?: boolean,
    delegate?: IScopedContext
  ): void;
  renderActions(): any[] | null;
  renderPopover(): React.JSX.Element;
  renderExtend(): React.JSX.Element | null;
  renderDialogMore(): {
    type: string;
    btnLabel: string;
    className: string;
    itemClassName: string;
    icon: string;
    form: {
      type: string;
      wrapWithPanel: boolean;
      panelClassName: string;
      actionsClassName: string;
      wrapperComponent: string;
      mode: string;
      horizontal: {
        justify: boolean;
        left: number;
      };
      autoFocus: boolean | undefined;
      formLazyChange: boolean;
      preventEnterSubmit: boolean;
      submitOnChange: boolean;
      data: any;
      title: any;
    };
  };
  renderForm(): {
    type: string;
    wrapWithPanel: boolean;
    panelClassName: string;
    actionsClassName: string;
    wrapperComponent: string;
    mode: string;
    horizontal: {
      justify: boolean;
      left: number;
    };
    autoFocus: boolean | undefined;
    formLazyChange: boolean;
    preventEnterSubmit: boolean;
    submitOnChange: boolean;
    data: any;
  };
  renderMoreSection(): React.JSX.Element | null;
  render(): React.JSX.Element | null;
}
export declare class SwitchMoreRenderer extends SwitchMore {}
export {};
