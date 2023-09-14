/**
 * @file 组件选项组件的可视化编辑控件
 */
import React from 'react';
import Sortable from 'sortablejs';
import type {FormControlProps} from 'amis-core';
import type {SchemaApi} from 'amis';
export type SourceType = 'custom' | 'api' | '';
export type NavControlItem = {
  id?: string;
  label: string;
  to?: string;
  target?: string;
  icon?:
    | string
    | {
        id: string;
        name: string;
        svg: string;
      };
  badge?: string;
  children?: Array<NavControlItem>;
};
export interface NavControlProps extends FormControlProps {}
export interface NavControlState {
  links: Array<NavControlItem>;
  api: SchemaApi;
  source: SourceType;
  showDialog: boolean;
  isEdit: boolean;
  modalName: string;
  modalParent: string;
  modalIcon: string;
  modalTarget: string;
  modalBadge: string;
  modalUrl: string;
  currentIndex: string;
  previousModalParent: string;
}
export declare class NavSourceControl extends React.Component<
  NavControlProps,
  NavControlState
> {
  sortables: Sortable[];
  drag?: HTMLElement | null;
  constructor(props: NavControlProps);
  transformSource(source: SchemaApi): 'api' | 'custom';
  transformOptions(props: NavControlProps): any;
  /**
   * 更新统一出口
   */
  onChange(): void;
  /**
   * 切换选项类型
   */
  handleSourceChange(source: SourceType): void;
  dragRef(ref: any): void;
  initDragging(): void;
  handleDragging(e: Sortable.SortableEvent): void;
  getNodePath(pathStr: string):
    | {
        path: string[];
        parentPath: string;
      }
    | {
        path: string;
        parentPath: string;
      };
  refreshBindDrag(): void;
  destroyDragging(destroyRoot?: boolean): void;
  /**
   * 删除选项
   */
  handleDelete(index: string): Promise<unknown>;
  handleUpdate(index: string): void;
  getChildren(): any;
  handleSubmit(): Promise<void>;
  handleSetNavId(data: NavControlItem[], index: string): void;
  handleDeleteNavId(data: NavControlItem[] | NavControlItem): void;
  handleFilterTreeData(data: NavControlItem[]): void;
  openModal(): void;
  closeModal(): void;
  handleChange(options: any): void;
  handleAPIChange(source: SchemaApi): void;
  renderApiPanel(): any;
  renderHeader(): React.JSX.Element;
  renderNav(dataSource: NavControlItem[], index?: string): React.JSX.Element;
  renderDialog(): any;
  render(): React.JSX.Element;
}
export declare class NavSourceControlRenderer extends NavSourceControl {}
