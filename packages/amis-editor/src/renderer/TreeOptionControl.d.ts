/**
 * @file 组件选项组件的可视化编辑控件
 */
import React from 'react';
import Sortable from 'sortablejs';
import type {Option} from 'amis';
import type {FormControlProps} from 'amis-core';
import type {SchemaApi} from 'amis';
export type OptionControlItem = Option & {
  checked?: boolean;
  _key?: string;
};
export interface OptionControlProps extends FormControlProps {
  className?: string;
  showIconField?: boolean;
}
export type SourceType = 'custom' | 'api' | 'apicenter' | 'variable';
export interface OptionControlState {
  options: Array<OptionControlItem>;
  api: SchemaApi;
  labelField: string;
  valueField: string;
  iconField: string;
  source: SourceType;
  modalVisible: boolean;
}
export default class TreeOptionControl extends React.Component<
  OptionControlProps,
  OptionControlState
> {
  sortables: Sortable[];
  drag?: HTMLElement | null;
  internalProps: string[];
  constructor(props: OptionControlProps);
  transformOptions(props: OptionControlProps): any;
  /**
   * 处理下未设置value的情况
   */
  pretreatOptions(options: Array<OptionControlItem>): any[];
  /**
   * 更新options字段的统一出口
   */
  onChange(): void;
  /**
   * 切换选项类型
   */
  handleSourceChange(source: SourceType): void;
  renderHeader(): React.JSX.Element;
  handleEditLabelOrValue(value: string, path: string, key: string): void;
  handleDelete(pathStr: string, index: number): void;
  getNodePath(pathStr: string):
    | {
        path: string[];
        parentPath: string;
      }
    | {
        path: string;
        parentPath: string;
      };
  addOption(pathStr: string): void;
  addChildOption(pathStr: string): void;
  hideModal(notResetOptions?: boolean): void;
  renderOptions(option: any, key: number, indexes: number[]): React.ReactNode;
  dragRef(ref: any): void;
  rereshBindDrag(): void;
  initDragging(): void;
  destroyDragging(destroyRoot?: boolean): void;
  renderModal(): React.JSX.Element;
  handleAPIChange(source: SchemaApi): void;
  handleLableFieldChange(labelField: string): void;
  handleValueFieldChange(valueField: string, ...a: any): void;
  handleIconFieldChange(iconField: string): void;
  renderApiPanel(): any;
  render(): React.JSX.Element;
}
export declare class TreeOptionControlRenderer extends TreeOptionControl {}
