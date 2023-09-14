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
   * 文本内容
   */
  text?: string | number;
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
   * 动态控制是否显示
   */
  visibleOn?: SchemaExpression;
  /**
   * 是否显示动画
   */
  animation?: boolean;
  /**
   * 角标的自定义样式
   */
  style?: {
    [propName: string]: any;
  };
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
    animation: boolean;
  };
  constructor(props: BadgeControlProps);
  componentDidUpdate(prevProps: BadgeControlProps): void;
  transformBadgeValue(): BadgeForm;
  normalizeBadgeValue(form: BadgeForm):
    | {
        offset: number[];
        size?: any;
        level?: any;
        mode?: 'text' | 'dot' | 'ribbon' | undefined;
        visibleOn?: any;
        style?:
          | {
              [propName: string]: any;
            }
          | undefined;
        text?: string | number | undefined;
        position?:
          | 'top-right'
          | 'top-left'
          | 'bottom-left'
          | 'bottom-right'
          | undefined;
        animation?: boolean | undefined;
        overflowCount?: number | undefined;
      }
    | {
        offset: [number, number];
        size?: any;
        level?: any;
        mode?: 'text' | 'dot' | 'ribbon' | undefined;
        visibleOn?: any;
        style?:
          | {
              [propName: string]: any;
            }
          | undefined;
        text?: string | number | undefined;
        position?:
          | 'top-right'
          | 'top-left'
          | 'bottom-left'
          | 'bottom-right'
          | undefined;
        animation?: boolean | undefined;
        overflowCount?: number | undefined;
      };
  handleSwitchChange(checked: boolean): void;
  handleSubmit(form: BadgeForm, action: any): void;
  renderBody(): any;
  render(): React.JSX.Element;
}
export declare class BadgeControlRenderer extends BadgeControl {}
export {};
