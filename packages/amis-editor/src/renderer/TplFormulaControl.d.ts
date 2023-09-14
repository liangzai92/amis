/**
 * @file 长文本公式输入框
 */
import React from 'react';
import type {VariableItem, CodeMirror} from 'amis-ui';
import {FormControlProps} from 'amis-core';
import {FormulaPlugin} from './textarea-formula/plugin';
import {CustomFormulaPickerProps} from './textarea-formula/FormulaPicker';
export interface TplFormulaControlProps extends FormControlProps {
  /**
   * 用于提示的变量集合，默认为空
   */
  variables?: Array<VariableItem> | Function;
  /**
   * 配合 variables 使用
   * 当 props.variables 存在时， 是否再从 amis数据域中取变量集合，默认 false;
   */
  requiredDataPropsVariables?: boolean;
  /**
   * 变量展现模式，可选值：'tabs' ｜ 'tree'
   */
  variableMode?: 'tree' | 'tabs';
  /**
   * 自定义fx面板
   */
  customFormulaPicker?: React.FC<CustomFormulaPickerProps>;
  /**
   * 是否可清除
   */
  clearable?: boolean;
  /**
   * 弹窗顶部标题，默认为 "表达式"
   */
  header: string;
}
interface TplFormulaControlState {
  value: string;
  variables: Array<VariableItem>;
  formulaPickerOpen: boolean;
  formulaPickerValue: string;
  expressionBrace?: Array<CodeMirror.Position>;
  tooltipStyle: {
    [key: string]: string;
  };
  loading: boolean;
}
export declare class TplFormulaControl extends React.Component<
  TplFormulaControlProps,
  TplFormulaControlState
> {
  static defaultProps: Partial<TplFormulaControlProps>;
  wrapRef: React.RefObject<HTMLDivElement>;
  tooltipRef: React.RefObject<HTMLDivElement>;
  editorPlugin: FormulaPlugin;
  unReaction: any;
  appLocale: string;
  appCorpusData: any;
  constructor(props: TplFormulaControlProps);
  componentDidMount(): Promise<void>;
  componentWillUnmount(): void;
  onExpressionMouseEnter(
    e: MouseEvent,
    expression: string,
    brace?: Array<CodeMirror.Position>
  ): void;
  hiddenToolTip(): void;
  handleKeyDown(e: any): void;
  closeFormulaPicker(): void;
  handleConfirm(value: any): void;
  handleOnChange(value: any): void;
  checkOpenFormulaPicker(value: string): void;
  handleClear(): void;
  /**
   * 公式编辑器打开完成一些异步任务的加载
   */
  beforeFormulaEditorOpen(): Promise<void>;
  handleFormulaClick(e: React.MouseEvent, type?: string): Promise<void>;
  editorFactory(dom: HTMLElement, cm: any): any;
  handleEditorMounted(cm: any, editor: any): void;
  editorAutoMark(): void;
  render(): React.JSX.Element;
}
export default class TplFormulaControlRenderer extends TplFormulaControl {}
export {};
