/**
 * @file 基础控件集合
 */
import type {BaseEventContext} from 'amis-editor-core';
export declare const BUTTON_DEFAULT_ACTION: {
  onEvent: {
    click: {
      actions: never[];
    };
  };
};
export type PrimitiveType = string | number | boolean;
/**
 * 校验项
 * 数组项为 ValidationType 或 对象形式的配置
 * 对象形式配置规则 优先匹配 isShow 形式，后匹配 isHidden 形式
 * 如下：
 */
export type ValidationOptions = Array<{
  option: string;
  isShow?: {
    [key: string]: PrimitiveType | Array<PrimitiveType>;
  };
  isHidden?: {
    [key: string]: PrimitiveType | Array<PrimitiveType>;
  };
}>;
export type FormItemControlPanel =
  | 'property'
  | 'common'
  | 'option'
  | 'status'
  | 'validation'
  | 'style'
  | 'option'
  | 'event';
/**
 * Label提示
 * 支持传入Schema或String，传入String则使用默认配置，如下：
 *
 * @default
 * ```
 * className: 'ae-BaseRemark',
 * icon: 'fa fa-question-circle',
 * trigger: ['hover', 'click'],
 * placement: 'left'
 * ```
 */
export declare const BaseLabelMark: (schema: Record<string, any> | string) =>
  | {
      content: any;
      className: string;
      icon: string;
      trigger: string[];
      placement: string;
    }
  | undefined;
/**
 * 表单项组件面板
 *
 * @param {Object=} panels
 * @param {string=} key
 * `property` 属性
 *     `common` 基本
 *     `status` 状态
 *     `validation` 校验
 * `style` 样式
 * `event` 事件
 * @param {string=} panels.body - 配置面板Schema
 * @param {boolean=} panels.replace - 是否完全替换默认Schema，默认追加
 * @param {Array} panels.validation.validationType - 默认显示的校验类型
 */
export declare const formItemControl: (
  panels: Partial<
    Record<
      FormItemControlPanel,
      {
        /**
         * 标题
         */
        title?: string;
        /**
         * 配置项内容
         */
        body?: any;
        /**
         * 是否完全替换默认配置项
         */
        replace?: boolean;
        /**
         * 配置项倒序排列
         */
        reverse?: boolean;
        /**
         * 是否隐藏面板
         */
        hidden?: boolean;
        /**
         * 配置项排序优先级
         */
        order?: Record<string, number>;
        /**
         * 默认支持的校验规则
         */
        validationType?: ValidationOptions;
      }
    >
  >,
  context?: BaseEventContext
) => Array<any>;
/**
 * 信息提示组件模版
 */
export declare function remarkTpl(config: {
  name: 'remark' | 'labelRemark';
  label: string;
  labelRemark?: string;
  i18nEnabled?: boolean;
}): {
  type: string;
  formType: string;
  className: string;
  label: any;
  bulk: boolean;
  name: 'remark' | 'labelRemark';
  pipeIn: (value: any) => boolean;
  pipeOut: (value: any) => any;
  form: {
    size: string;
    className: string;
    mode: string;
    horizontal: {
      left: number;
      right: number;
      justify: boolean;
    };
    body: {
      type: string;
      className: string;
      gap: string;
      columns: {
        md: string;
        body: any[];
      }[];
    };
  };
};
