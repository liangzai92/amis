/**
 * @file 角标控件
 */
import React from 'react';
import type {FormControlProps} from 'amis-core';
import type {SchemaExpression} from 'amis';
export interface BadgeControlProps extends FormControlProps {
  /**
   * 角标类型
   */
  mode?: 'text' | 'dot' | 'ribbon';
  /**
   * 角标大小
   */
  size?: any;
  /**
   * 角标位置，优先级大于position
   */
  offset?: [number, number];
  /**
   * 角标位置
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /**
   * 封顶的数字值
   */
  overflowCount?: number;
  /**
   * 提示类型
   */
  level?: 'info' | 'warning' | 'success' | 'danger' | SchemaExpression;
}
interface BadgeControlState {
  checked: boolean;
}
interface BadgeForm
  extends Partial<
    Pick<
      BadgeControlProps,
      | 'mode'
      | 'text'
      | 'size'
      | 'position'
      | 'overflowCount'
      | 'visibleOn'
      | 'animation'
      | 'style'
      | 'level'
    >
  > {
  offset: [number, number];
}
export default class BadgeControl extends React.Component<
  BadgeControlProps,
  BadgeControlState
> {
  static defaultProps: {
    mode: string;
    overflowCount: number;
    position: string;
    level: string;
  };
  constructor(props: BadgeControlProps);
  transformBadgeValue(): BadgeForm;
  normalizeBadgeValue(form: BadgeForm):
    | {
        offset: number[];
        size?: any;
        level?: any;
        mode?: 'text' | 'dot' | 'ribbon' | undefined;
        visibleOn?: unknown;
        style?: unknown;
        text?: unknown;
        position?:
          | 'top-right'
          | 'top-left'
          | 'bottom-left'
          | 'bottom-right'
          | undefined;
        animation?: unknown;
        overflowCount?: number | undefined;
      }
    | {
        offset: [number, number];
        size?: any;
        level?: any;
        mode?: 'text' | 'dot' | 'ribbon' | undefined;
        visibleOn?: unknown;
        style?: unknown;
        text?: unknown;
        position?:
          | 'top-right'
          | 'top-left'
          | 'bottom-left'
          | 'bottom-right'
          | undefined;
        animation?: unknown;
        overflowCount?: number | undefined;
      };
  handleSwitchChange(checked: boolean): void;
  handleSubmit(form: BadgeForm, action: any): void;
  renderBody(): any;
  render(): React.JSX.Element;
}
export declare class BadgeControlRenderer extends BadgeControl {}
export {};
