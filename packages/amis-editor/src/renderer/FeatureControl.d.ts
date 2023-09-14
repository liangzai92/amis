/**
 * @file 控制功能开关的控件，这里的功能指需要加子组件来支持的功能
 */
import React from 'react';
import Sortable from 'sortablejs';
import {FormControlProps} from 'amis';
export type FeatureOption = {
  label: string;
  value: any;
  remove?: (data: any) => void;
  /** 提供该字段表示删除后还可以再新增回来 */
  add?: (data: any) => void;
  isActive?: (data: any) => boolean;
};
interface FeatureControlProps extends FormControlProps {
  className?: string;
  removable?: boolean;
  addable?: boolean;
  addText?: string;
  sortable?: boolean;
  checkable?: boolean;
  checkableOn?: string;
  features: Array<FeatureOption> | ((schema: any) => Array<FeatureOption>);
  goFeatureComp?: (item: FeatureOption, index: number) => string;
  onSort?: (
    data: any,
    value: {
      oldIndex: number;
      newIndex: number;
    }
  ) => void;
  customAction?: (props: {schema: any; onBulkChange: any}) => any;
  onItemCheck?: (checked: boolean, index: number, schema: any) => void;
  hideAddWhenAll?: boolean;
}
interface FeatureControlState {
  /**
   * 当前启用的功能
   */
  inUseFeat: FeatureOption[];
  /**
   * 未启用的功能
   */
  unUseFeat: FeatureOption[];
}
export default class FeatureControl extends React.Component<
  FeatureControlProps,
  FeatureControlState
> {
  constructor(props: FeatureControlProps);
  static getDerivedStateFromProps(
    nextProps: FeatureControlProps,
    preState: FeatureControlState
  ): {
    inUseFeat: FeatureOption[];
    unUseFeat: FeatureOption[];
  };
  static initState(
    data: any,
    features: FeatureOption[] | ((schema: any) => Array<FeatureOption>),
    lastInUseFeat?: FeatureOption[],
    lastUnUseFeat?: FeatureOption[]
  ): {
    inUseFeat: FeatureOption[];
    unUseFeat: FeatureOption[];
  };
  handleRemove(item: FeatureOption, index: number): void;
  handleSort(e: any): void;
  handleAdd(item: any): void;
  sortable?: Sortable;
  drag?: HTMLElement | null;
  dragRef(ref: any): void;
  /**
   * 初始化拖动
   */
  initDragging(): void;
  /**
   * 拖动的销毁
   */
  destroyDragging(): void;
  handleCheck(res: boolean, index: number): void;
  renderItem(
    item: FeatureOption,
    index: number,
    checkable: boolean
  ): React.JSX.Element;
  renderAction(): any;
  render(): React.JSX.Element;
}
export declare class FeatureControlRenderer extends FeatureControl {}
export {};
