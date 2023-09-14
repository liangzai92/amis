/**
 * @file Transfer的表格对应选项
 */
import React from 'react';
import type {SchemaApi} from 'amis';
import type {FormControlProps} from 'amis-core';
import type {Option} from 'amis';
interface OptionControlProps extends FormControlProps {
  className?: string;
}
type SourceType = 'custom' | 'api' | 'form' | 'variable';
interface OptionControlState {
  api: SchemaApi;
  labelField: string;
  valueField: string;
  source: SourceType;
}
export default class TransferTableOption extends React.Component<
  OptionControlProps,
  {}
> {
  addColumns(): {
    type: string;
    actionType: string;
    label: string;
    level: string;
    dialog: {
      title: string;
      headerClassName: string;
      closeOnEsc: boolean;
      closeOnOutside: boolean;
      showCloseButton: boolean;
      onConfirm: (...args: Array<any>) => void;
      body: {
        name: string;
        type: string;
        multiple: boolean;
        label: boolean;
        strictMode: boolean;
        addButtonText: string;
        draggable: boolean;
        value: any;
        items: (
          | {
              type: string;
              name: string;
              placeholder: string;
              value?: undefined;
              options?: undefined;
            }
          | {
              type: string;
              name: string;
              placeholder: string;
              value: string;
              options: {
                value: string;
                label: string;
              }[];
            }
        )[];
      }[];
    };
  };
  addRows(): {
    type: string;
    tooltip: string;
    tooltipTheme: string;
    placement: string;
    tooltipStyle: {
      fontSize: string;
    };
    className: string;
    body: {
      type: string;
      actionType: string;
      label: string;
      level: string;
      disabled: any;
      block: boolean;
      dialog: {
        title: string;
        headerClassName: string;
        closeOnEsc: boolean;
        closeOnOutside: boolean;
        showCloseButton: boolean;
        size: string;
        onConfirm: (...args: Array<any>) => void;
        body: {
          type: string;
          wrapWithPanel: boolean;
          mode: string;
          body: {
            name: string;
            type: string;
            multiple: boolean;
            draggable: boolean;
            addButtonText: string;
            value: any;
            items: any[];
          }[];
        }[];
      };
    }[];
  };
  handleChange(value: Array<Option>, type: 'options' | 'columns'): void;
  render(): React.JSX.Element;
}
declare const TransferTableControl: {
  new (props: OptionControlProps): {
    $comp: string;
    internalProps: string[];
    /**
     * 更新options字段的统一出口
     */
    onChange(): void;
    /**
     * 切换选项类型
     */
    handleSourceChange(source: SourceType): void;
    handleAPIChange(source: SchemaApi): void;
    handleLableFieldChange(labelField: string): void;
    handleValueFieldChange(valueField: string): void;
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
    renderHeader(): React.JSX.Element;
    renderApiPanel(): any;
    render(): React.JSX.Element;
    context: unknown;
    setState<K extends keyof OptionControlState>(
      state:
        | OptionControlState
        | ((
            prevState: Readonly<OptionControlState>,
            props: Readonly<OptionControlProps>
          ) => OptionControlState | Pick<OptionControlState, K> | null)
        | Pick<OptionControlState, K>
        | null,
      callback?: (() => void) | undefined
    ): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<OptionControlProps>;
    state: Readonly<OptionControlState>;
    refs: {
      [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(
      nextProps: Readonly<OptionControlProps>,
      nextState: Readonly<OptionControlState>,
      nextContext: any
    ): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(
      prevProps: Readonly<OptionControlProps>,
      prevState: Readonly<OptionControlState>
    ): any;
    componentDidUpdate?(
      prevProps: Readonly<OptionControlProps>,
      prevState: Readonly<OptionControlState>,
      snapshot?: any
    ): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(
      nextProps: Readonly<OptionControlProps>,
      nextContext: any
    ): void;
    UNSAFE_componentWillReceiveProps?(
      nextProps: Readonly<OptionControlProps>,
      nextContext: any
    ): void;
    componentWillUpdate?(
      nextProps: Readonly<OptionControlProps>,
      nextState: Readonly<OptionControlState>,
      nextContext: any
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<OptionControlProps>,
      nextState: Readonly<OptionControlState>,
      nextContext: any
    ): void;
  };
  contextType?: React.Context<any> | undefined;
};
export declare class TransferTableControlRenderer extends TransferTableControl {}
export {};
