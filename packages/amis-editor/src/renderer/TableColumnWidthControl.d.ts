/**
 * @file 表格自定义列可视化编辑控件
 */
import React from 'react';
import {FormControlProps} from 'amis';
interface optionType {
  label: string;
  value: string;
}
export interface TableColumnWidthProps extends FormControlProps {
  className?: string;
}
export interface TableColumnWidthState {
  columns?: Array<any>;
  activeOption: optionType;
}
export default class TableColumnWidthControl extends React.Component<
  TableColumnWidthProps,
  TableColumnWidthState
> {
  options: Array<optionType>;
  constructor(props: any);
  componentDidMount(): void;
  handleOptionChange(item: optionType): void;
  renderHeader(): React.JSX.Element;
  handleChange(type: 'fixed' | 'percentage', val: number): void;
  renderBody(): any;
  render(): React.JSX.Element;
}
export declare class TableColumnWidthControlRender extends TableColumnWidthControl {}
export {};
