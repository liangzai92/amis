/**
 * @file CRUDColumnControl
 * @desc 列配置控件
 */
import React from 'react';
import Sortable from 'sortablejs';
import type {FormControlProps} from 'amis';
import type {ColumnSchema} from 'amis/lib/renderers/Table2';
import type {DSBuilderInterface} from '../../builder';
interface Option {
  label: string;
  value: string;
  nodeId: string;
  hidden: boolean;
  /** 原始结构 */
  pristine: DesignColumnSchema;
  /** 字段信息 */
  context?: any;
}
interface DesignColumnSchema extends ColumnSchema {
  /** 设计态节点 ID */
  $$id: string;
  /** schema ID */
  id: string;
  /** 绑定的实体字段的 ID */
  fieldId?: string;
  relationBuildSetting?: any;
}
export interface CRUDColumnControlProps extends FormControlProps {
  /** CRUD 节点的 ID */
  nodeId: string;
  builder: DSBuilderInterface;
}
export interface CRUDColumnControlState {
  options: Option[];
  loading: boolean;
  showAddModal: boolean;
  addModalData?: {
    colTypeLabel: string;
    colType: 'field' | 'operation';
  };
}
export declare class CRUDColumnControl extends React.Component<
  CRUDColumnControlProps,
  CRUDColumnControlState
> {
  sortable?: Sortable;
  drag?: HTMLElement | null;
  dom?: HTMLElement;
  constructor(props: CRUDColumnControlProps);
  componentDidMount(): void;
  componentDidUpdate(prevProps: Readonly<CRUDColumnControlProps>): void;
  transformOption(option: DesignColumnSchema): Option | false;
  initOptions(): Promise<void>;
  dragRef(ref: any): void;
  initDragging(): void;
  destroyDragging(): void;
  handleSort(): void;
  handleEdit(item: Option): void;
  /** 添加列 */
  handleAddColumn(type: 'field' | 'empty' | 'container' | 'operation'): void;
  handleAddModalConfirm(scaffold: DesignColumnSchema): void;
  handleAddModalClose(): void;
  handleDelete(item: Option, index: number): Promise<void>;
  renderOption(item: Option, index: number): React.JSX.Element;
  renderHeader(): React.JSX.Element;
  render(): React.JSX.Element;
}
export declare class CRUDColumnControlRenderer extends CRUDColumnControl {}
export {};
