/**
 * @file CRUDFiltersControl
 * @desc 搜索控件
 */
import React from 'react';
import type {DSFeatureType, DSBuilderInterface} from '../../builder';
import type {EditorNodeType} from 'amis-editor-core';
import type {FormControlProps} from 'amis';
interface Option {
  label: string;
  value: string;
  nodeId: string;
  node?: EditorNodeType;
  /** 原始结构 */
  pristine: Record<string, any>;
  /** 字段信息 */
  context?: Record<string, any>;
}
interface CRUDFiltersControlProps extends FormControlProps {
  /** CRUD配置面板的数据 */
  data: Record<string, any>;
  /** CRUD 节点的 ID */
  nodeId: string;
  feat: Extract<DSFeatureType, 'SimpleQuery' | 'AdvancedQuery' | 'FuzzyQuery'>;
  /** 数据源构造器 */
  builder: DSBuilderInterface;
}
interface CRUDFiltersControlState {
  options: Option[];
  loading: boolean;
  checked: boolean;
  /** 目标组件的 Node.id */
  targetNodeId?: string;
}
export declare class CRUDFiltersControl extends React.Component<
  CRUDFiltersControlProps,
  CRUDFiltersControlState
> {
  dom?: HTMLElement;
  constructor(props: CRUDFiltersControlProps);
  componentDidMount(): void;
  componentDidUpdate(
    prevProps: Readonly<CRUDFiltersControlProps>,
    prevState: Readonly<CRUDFiltersControlState>,
    snapshot?: any
  ): void;
  transformOption(option: any): Option | false;
  initOptions(): Promise<void>;
  updateSimpleQuery(enable: boolean): Promise<void>;
  updateAdvancedQuery(enable: boolean): Promise<void>;
  updateFuzzyQuery(enable: boolean): Promise<void>;
  handleToggle(checked: boolean): Promise<void>;
  handleEdit(item?: Option): void;
  renderOption(item: Option, index: number): React.JSX.Element;
  renderHeader(): React.JSX.Element;
  render(): React.ReactNode;
}
export declare class CRUDFiltersControlRenderer extends CRUDFiltersControl {}
export {};
