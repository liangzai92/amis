/**
 * @file 表达式控件
 */
import React from 'react';
import {CustomFormulaPickerProps} from './textarea-formula/FormulaPicker';
import type {
  VariableItem,
  FuncGroup
} from 'amis-ui/lib/components/formula/Editor';
import {FormControlProps} from 'amis-core';
import type {BaseEventContext} from 'amis-editor-core';
import {EditorManager} from 'amis-editor-core';
export declare enum FormulaDateType {
  NotDate = 0,
  IsDate = 1,
  IsRange = 2
}
export declare function renderFormulaValue(item: any): React.JSX.Element;
export interface FormulaControlProps extends FormControlProps {
  manager?: EditorManager;
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
   * 变量展现模式，可选值：'tabs' ｜ 'tree', 默认 tabs
   */
  variableMode?: 'tabs' | 'tree';
  /**
   * 函数集合，默认不需要传，即  amis-formula 里面那个函数
   * 如果有扩充，则需要传。
   */
  functions: Array<FuncGroup>;
  /**
   * 弹窗顶部标题，默认为 "表达式"
   */
  header: string;
  /**
   * 静态输入框的占位提示内容，可用于默认静态输入框 & 自定义自定义渲染器 中
   */
  placeholder: string;
  /**
   * 编辑器上下文数据，用于获取字段所在Form的其他字段
   */
  context: BaseEventContext;
  /**
   * simple 简易模式
   * 备注: 为 true 时，仅显示 公式编辑器 icon 按钮
   */
  simple?: boolean;
  /**
   * 自定义渲染器:
   * 备注: 可用于设置指定组件类型编辑默认值
   */
  rendererSchema?: any;
  /**
   * 自定义渲染器 是否需要浅色边框包裹，默认不包裹
   */
  rendererWrapper?: boolean;
  /**
   * 是否需要剔除属性
   */
  needDeleteProps?: Array<string>;
  /**
   * 期望的value类型，可用于校验公式运算结果类型是否匹配
   * 备注1: 当前支持识别的类型有 int、boolean、date、object、array、string；
   * 备注2: 开关组件可以设置 true 和 false 对应的值，如果设置了就不是普通的 boolean 类型；
   * 备注3: 默认都是字符串类型；
   */
  /**
   * 不在表单项上触发时，传入想要获取变量的 表单props 获取对应变量
   */
  formProps?: any;
  /**
   * 是否使用外部的Form数据
   */
  useExternalFormData?: boolean;
  /**
   * 是否是日期类组件使用formulaControl
   * 日期类 值 使用表达式时，支持 now、+1day、-2weeks、+1hours、+2years等这种相对值写法，不会最外层包裹 ${}
   * 日期类 跨度值 使用表达式时，支持 1day、2weeks、1hours、2years等这种相对值写法，不会最外层包裹 ${}
   * 默认为 FormulaDateType.NotDate
   */
  DateTimeType?: FormulaDateType;
  /**
   * 自定义fx面板
   */
  customFormulaPicker?: React.FC<CustomFormulaPickerProps>;
}
interface FormulaControlState {
  /** 变量数据 */
  variables: any;
  variableMode?: 'tree' | 'tabs';
  formulaPickerOpen: boolean;
  loading: boolean;
}
export default class FormulaControl extends React.Component<
  FormulaControlProps,
  FormulaControlState
> {
  static defaultProps: Partial<FormulaControlProps>;
  isUnmount: boolean;
  unReaction: any;
  appLocale: string;
  appCorpusData: any;
  constructor(props: FormulaControlProps);
  componentDidMount(): Promise<void>;
  componentWillUnmount(): void;
  /**
   * 将 ${xx}（非 \${xx}）替换成 \${xx}
   * 备注: 手动编辑时，自动处理掉 ${xx}，避免识别成 公式表达式
   */
  outReplaceExpression(expression: any): any;
  inReplaceExpression(expression: any): any;
  isLoopExpression(expression: any, selfName: string): boolean;
  isExpectType(value: any): boolean;
  matchDate(str: string): boolean;
  matchDateRange(str: string): boolean;
  hasDateShortcutkey(str: string): boolean;
  transExpr(str: string): string;
  handleConfirm(value: any): void;
  /**
   * 公式编辑器打开完成一些异步任务的加载
   */
  beforeFormulaEditorOpen(): Promise<void>;
  handleFormulaClick(): Promise<void>;
  closeFormulaPicker(): void;
  handleSimpleInputChange: (value: any) => void;
  handleInputChange: (value: any) => void;
  filterCustomRendererProps(rendererSchema: any): any;
  getContextData(): any;
  render(): React.JSX.Element;
}
export declare class FormulaControlRenderer extends FormulaControl {}
export {};
