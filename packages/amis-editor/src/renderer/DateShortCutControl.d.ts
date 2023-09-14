/**
 * @file 时间选择器的快捷键
 */
import React from 'react';
import Sortable from 'sortablejs';
import {FormControlProps, Option} from 'amis-core';
import {BaseEventContext} from 'amis-editor-core';
declare const CertainPresetShorcut: {
  today: string;
  yesterday: string;
  thisweek: string;
  prevweek: string;
  thismonth: string;
  prevmonth: string;
  thisquarter: string;
  prevquarter: string;
  thisyear: string;
};
declare const ModifyPresetShorcut: {
  $hoursago: string;
  $daysago: string;
  $dayslater: string;
  $weeksago: string;
  $weekslater: string;
  $monthsago: string;
  $monthslater: string;
  $quartersago: string;
  $quarterslater: string;
  $yearsago: string;
  $yearslater: string;
};
export interface DateShortCutControlProps extends FormControlProps {
  className?: string;
  /**
   * 编辑器上下文数据，用于获取字段所在Form的其他字段
   */
  context: BaseEventContext;
  certainOptions: Array<keyof typeof CertainPresetShorcut>;
  modifyOptions: Array<keyof typeof ModifyPresetShorcut>;
}
type PresetShorCutType = string;
type CustomShortCutType = {
  label: string;
  startDate: string;
  endDate: string;
};
type ModifyOptionType = {
  key: keyof typeof ModifyPresetShorcut;
  value: string;
};
declare enum OptionType {
  Custom = 1,
  Certain = 2,
  Modify = 3
}
interface OptionDataType {
  data: PresetShorCutType | CustomShortCutType | ModifyOptionType;
  type?: OptionType;
}
interface DateShortCutControlState {
  options: Array<OptionDataType>;
}
export declare class DateShortCutControl extends React.PureComponent<
  DateShortCutControlProps,
  DateShortCutControlState
> {
  sortable?: Sortable;
  drag?: HTMLElement | null;
  target: HTMLElement | null;
  certainDropDownOptions: Array<Option>;
  modifyDropDownOptions: Array<Option>;
  static defaultProps: Partial<DateShortCutControlProps>;
  constructor(props: DateShortCutControlProps);
  dragRef(ref: any): void;
  scrollToBottom(): void;
  /**
   * 初始化拖动
   */
  initDragging(): void;
  /**
   * 拖动的销毁
   */
  destroyDragging(): void;
  /**
   * 生成快捷键项的配置
   */
  renderOption(option: OptionDataType, index: number): any;
  /**
   * 生成内容体
   */
  renderContent(): React.JSX.Element;
  /**
   * 自定义跨度变化
   */
  handleOptionChange(
    data: string | CustomShortCutType | ModifyOptionType,
    index: number
  ): void;
  /**
   * option添加
   */
  addItem(item: Option, type: OptionType): void;
  /**
   * 删除选项
   */
  handleDelete(index: number, e: React.UIEvent<any>): void;
  /**
   * 更新options字段的统一出口
   */
  onChangeOptions(): void;
  render(): React.JSX.Element;
}
export declare class DateShortCutControlRender extends DateShortCutControl {}
export {};
