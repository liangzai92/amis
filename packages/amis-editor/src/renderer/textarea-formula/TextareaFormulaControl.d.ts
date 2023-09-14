/**
 * @file 长文本公式输入框
 */
import React, {MouseEvent} from 'react';
import {FormControlProps} from 'amis-core';
import type {VariableItem, CodeMirror} from 'amis-ui';
import {FormulaPlugin} from './plugin';
import {CustomFormulaPickerProps} from './FormulaPicker';
export interface AdditionalMenuClickOpts {
  /**
   * 当前表达式值
   */
  value: string;
  /**
   * 对表达式重新赋值
   * @param value
   * @returns
   */
  setValue: (value: string) => void;
  /**
   * 在光标位置插入新的值
   * @param content 要插入的内容
   * @param type 插入内容的类型，目前支持表达式expression 和普通文本string
   * @param brace 自定义插入的位置
   * @returns
   */
  insertContent: (
    content: string,
    type: 'expression' | 'string',
    brace?: Array<CodeMirror.Position>
  ) => void;
}
export interface AdditionalMenu {
  label: string;
  onClick?: (
    e: MouseEvent<HTMLAnchorElement>,
    opts: AdditionalMenuClickOpts
  ) => void;
  icon?: string;
  className?: string;
}
export interface TextareaFormulaControlProps extends FormControlProps {
  /**
   * 输入框的高度， 默认 100 px
   */
  height?: number;
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
   *  附加底部按钮菜单项
   */
  additionalMenus?: Array<AdditionalMenu>;
  /**
   * 整体点击长文本公式输入框
   */
  onOverallClick?: () => void;
  /**
   * 自定义fx面板
   */
  customFormulaPicker?: React.FC<CustomFormulaPickerProps>;
  /**
   * 自定义标记文本
   * @param editor
   * @returns
   */
  customMarkText?: (editor: CodeMirror.Editor) => void;
  /**
   * 插件初始化生命周期回调
   * @param plugin 插件实例，内部包含公式插件的方法
   * @returns
   */
  onPluginInit?: (plugin: FormulaPlugin) => void;
  /**
   * 弹窗顶部标题，默认为 "表达式"
   */
  header: string;
}
interface TextareaFormulaControlState {
  value: string;
  variables: Array<VariableItem>;
  formulaPickerOpen: boolean;
  formulaPickerValue: string;
  expressionBrace?: Array<CodeMirror.Position>;
  isFullscreen: boolean;
  tooltipStyle: {
    [key: string]: string;
  };
  loading: boolean;
}
export declare class TextareaFormulaControl extends React.Component<
  TextareaFormulaControlProps,
  TextareaFormulaControlState
> {
  static defaultProps: Partial<TextareaFormulaControlProps>;
  wrapRef: React.RefObject<HTMLDivElement>;
  tooltipRef: React.RefObject<HTMLDivElement>;
  editorPlugin: FormulaPlugin;
  unReaction: any;
  appLocale: string;
  appCorpusData: any;
  constructor(props: TextareaFormulaControlProps);
  componentDidMount(): Promise<void>;
  componentDidUpdate(prevProps: TextareaFormulaControlProps): Promise<void>;
  componentWillUnmount(): void;
  onExpressionMouseEnter(
    e: any,
    expression: string,
    brace?: Array<CodeMirror.Position>
  ): void;
  hiddenToolTip(): void;
  closeFormulaPicker(): void;
  handleConfirm(value: any): void;
  handleOnChange(value: any): void;
  editorFactory(dom: HTMLElement, cm: any): any;
  handleEditorMounted(cm: any, editor: any): void;
  handleFullscreenModeChange(): void;
  handleFormulaEditorOpen(): Promise<void>;
  handleFormulaClick(e: React.MouseEvent, type?: string): Promise<void>;
  editorAutoMark(): void;
  handleAddtionalMenuClick(
    e: MouseEvent<HTMLAnchorElement>,
    item: AdditionalMenu
  ): void;
  render(): React.JSX.Element;
}
export default class TextareaFormulaControlRenderer extends TextareaFormulaControl {}
export {};
