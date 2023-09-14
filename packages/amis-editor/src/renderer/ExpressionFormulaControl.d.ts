/**
 * @file 表达式输入框组件
 */
import React from 'react';
import {FormControlProps} from 'amis-core';
import type {VariableItem} from 'amis-ui';
interface ExpressionFormulaControlProps extends FormControlProps {
  /**
   * 用于提示的变量集合，默认为空
   */
  variables?: Array<VariableItem> | Function;
  /**
   * 配合 variables 使用
   * 当 props.variables 存在时， 是否再从 amis数据域中取变量集合，默认 false
   */
  requiredDataPropsVariables?: boolean;
  /**
   * 变量展现模式，可选值：'tabs' ｜ 'tree'
   */
  variableMode?: 'tabs' | 'tree';
  /**
   * 表达式最外层是否使用 ${} 来包裹，默认 true
   */
  evalMode: boolean;
}
interface ExpressionFormulaControlState {
  variables: Array<VariableItem>;
  formulaPickerValue: string;
}
export default class ExpressionFormulaControl extends React.Component<
  ExpressionFormulaControlProps,
  ExpressionFormulaControlState
> {
  static defaultProps: Partial<ExpressionFormulaControlProps>;
  isUnmount: boolean;
  unReaction: any;
  appLocale: string;
  appCorpusData: any;
  constructor(props: ExpressionFormulaControlProps);
  componentDidMount(): Promise<void>;
  componentDidUpdate(prevProps: ExpressionFormulaControlProps): Promise<void>;
  componentWillUnmount(): void;
  initFormulaPickerValue(value: string): void;
  handleConfirm(value?: string): void;
  handleClearExpression(e: React.MouseEvent<HTMLElement>): void;
  handleOnClick(
    e: React.MouseEvent,
    onClick: (e: React.MouseEvent) => void
  ): Promise<void>;
  render(): React.JSX.Element;
}
export declare class ExpressionFormulaControlRenderer extends ExpressionFormulaControl {}
export {};
