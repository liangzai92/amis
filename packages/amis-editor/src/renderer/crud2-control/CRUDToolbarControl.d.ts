/**
 * @file CRUDToolbarControl
 * @desc 顶部工具栏控件
 */
import React from 'react';
import {DSFeatureType} from '../../builder';
import type {FormControlProps} from 'amis';
import type {EditorNodeType} from 'amis-editor-core';
import type {DSBuilderInterface} from '../../builder';
type ActionValue =
  | Extract<DSFeatureType, 'Insert' | 'BulkEdit' | 'BulkDelete'>
  | 'custom';
interface Option {
  label: string;
  value: ActionValue;
  nodeId: string;
  /** 原始结构 */
  pristine: Record<string, any>;
  node?: EditorNodeType;
}
export interface CRUDToolbarControlProps extends FormControlProps {
  /** CRUD 节点的 ID */
  nodeId: string;
  builder: DSBuilderInterface;
}
export interface CRUDToolbarControlState {
  options: Option[];
  loading: boolean;
}
export declare class CRUDToolbarControl extends React.Component<
  CRUDToolbarControlProps,
  CRUDToolbarControlState
> {
  drag?: HTMLElement | null;
  dom?: HTMLElement;
  /** 可供使用的功能集合 */
  collection: ActionValue[];
  constructor(props: CRUDToolbarControlProps);
  componentDidMount(): void;
  componentDidUpdate(prevProps: Readonly<CRUDToolbarControlProps>): void;
  getActions(props: CRUDToolbarControlProps): EditorNodeType[];
  initOptions(actions: EditorNodeType[]): void;
  getOptionLabel(schema: any, behavior: ActionValue): any;
  handleEdit(item: Option): void;
  /** 添加列 */
  handleAddAction(type: ActionValue): Promise<void>;
  handleDelete(option: Option, index: number): Promise<void>;
  renderOption(item: Option, index: number): React.JSX.Element;
  renderHeader(): React.JSX.Element;
  render(): React.JSX.Element;
}
export declare class CRUDToolbarControlRenderer extends CRUDToolbarControl {}
export {};
