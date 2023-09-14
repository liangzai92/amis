/**
 * @file API 适配器
 */
import React from 'react';
import {FormControlProps} from 'amis-core';
import {TooltipObject} from 'amis-ui/lib/components/TooltipWrapper';
interface AdaptorFuncParam {
  label: string;
  tip?: string | TooltipObject;
}
export interface APIAdaptorControlProps extends FormControlProps {
  /**
   * 适配器函数参数
   */
  params?: AdaptorFuncParam[];
  /**
   * 复用适配器 函数参数提示
   */
  mergeParams?: (params: AdaptorFuncParam[]) => AdaptorFuncParam[];
  /**
   * 代码编辑器底部的 description
   */
  editorDesc?: any;
  /**
   * 代码编辑器开启时 需要预置的代码
   */
  defaultCode?: string;
  /**
   * 代码编辑器开启 的 placeHolder
   */
  editorPlaceholder?: string;
  /**
   * 开关右侧旁边的提示
   */
  switchTip?: string | React.ReactNode;
  /**
   * 自定义提示参数
   */
  tooltipProps?: TooltipObject;
}
export interface APIAdaptorControlState {
  switch: boolean;
}
export default class APIAdaptorControl extends React.Component<
  APIAdaptorControlProps,
  APIAdaptorControlState
> {
  static defaultProps: Pick<APIAdaptorControlProps, 'params'>;
  constructor(props: APIAdaptorControlProps);
  onChange(value?: any): void;
  genTooltipProps(
    content: any,
    othersProps?: TooltipObject
  ):
    | {
        title?: string | undefined;
        content: string;
        placement: string;
        tooltipTheme: string;
        offset?: [number, number] | undefined;
        style?: React.CSSProperties | undefined;
        enterable?: boolean | undefined;
        showArrow?: boolean | undefined;
        disabled?: boolean | undefined;
        mouseEnterDelay?: number | undefined;
        mouseLeaveDelay?: number | undefined;
        children?: (() => JSX.Element) | undefined;
        container?:
          | HTMLElement
          | (() => HTMLElement | null | undefined)
          | undefined;
        trigger:
          | string
          | import('amis-ui/lib/components/TooltipWrapper').Trigger[];
        rootClose: boolean;
        tooltipClassName: string;
        tooltipBodyClassName?: string | undefined;
        filterHtml?: ((input: string) => string) | undefined;
      }
    | {
        title?: string | undefined;
        content: string;
        placement: string;
        tooltipTheme: string;
        offset?: [number, number] | undefined;
        style?: React.CSSProperties | undefined;
        enterable?: boolean | undefined;
        showArrow?: boolean | undefined;
        disabled?: boolean | undefined;
        mouseEnterDelay?: number | undefined;
        mouseLeaveDelay?: number | undefined;
        children: () => any;
        container?:
          | HTMLElement
          | (() => HTMLElement | null | undefined)
          | undefined;
        trigger:
          | string
          | import('amis-ui/lib/components/TooltipWrapper').Trigger[];
        rootClose: boolean;
        tooltipClassName: string;
        tooltipBodyClassName?: string | undefined;
        filterHtml?: ((input: string) => string) | undefined;
      };
  renderEditor(): React.JSX.Element | null;
  renderSwitch(): any;
  render(): React.JSX.Element;
}
export declare class APIAdaptorControlRenderer extends APIAdaptorControl {}
export declare const requestAdaptorDefaultCode =
  'api.data.count = api.data.count + 1;\nreturn api;';
export declare const adaptorApiStruct =
  "{\n  url: string; // \u5F53\u524D\u63A5\u53E3\u5730\u5740\n  method: 'get' | 'post' | 'put' | 'delete';\n  data?: Object; // \u8BF7\u6C42\u4F53\n  headers?: Object; // \u8BF7\u6C42\u5934\n  ...\n}";
export declare const adaptorContextStruct =
  '{\n  // \u4E0A\u4E0B\u6587\u6570\u636E\n  [key: string]: any;\n}';
export declare const adaptorApiStructTooltip: {
  body: {
    type: string;
    language: string;
    className: string;
    value: string;
  };
  style?:
    | {
        width: string;
        height: string;
      }
    | undefined;
  type: string;
};
export declare const adaptorContextStructTooltip: {
  body: {
    type: string;
    language: string;
    className: string;
    value: string;
  };
  style?:
    | {
        width: string;
        height: string;
      }
    | undefined;
  type: string;
};
export declare const adaptorResponseStruct =
  '{\n  data: Object; // \u63A5\u53E3\u8FD4\u56DE\u6570\u636E,\n  request: XMLHttpRequest;\n  headers?: Object; // \u8BF7\u6C42\u5934\n  status: number; // \u72B6\u6001\u7801 200, 404, 500..\n  statusText: string; // \u72B6\u6001\u4FE1\u606F\n  ...\n}';
export declare const adaptorResponseStructTooltip: {
  body: {
    type: string;
    language: string;
    className: string;
    value: string;
  };
  style?:
    | {
        width: string;
        height: string;
      }
    | undefined;
  type: string;
};
export declare const adaptorDefaultCode =
  "// API\u54CD\u5E94\u6216\u81EA\u5B9A\u4E49\u5904\u7406\u540E\u9700\u8981\u7B26\u5408\u4EE5\u4E0B\u683C\u5F0F\nreturn {\n    status: 0, // 0 \u8868\u793A\u8BF7\u6C42\u6210\u529F\uFF0C\u5426\u5219\u6309\u9519\u8BEF\u5904\u7406\n    msg: '\u8BF7\u6C42\u6210\u529F',\n    data: {\n        text: 'world',\n        items: [\n            {label: '\u5F20\u4E09', value: 1}\n        ]\n    }\n}";
export declare const validateApiAdaptorDefaultCode =
  "// \u6821\u9A8C\u6210\u529F\nreturn {\n    status: 0\n};\n\n// \u6821\u9A8C\u5931\u8D25\nreturn {\n  status: 422,\n  errors: '\u5F53\u524D\u7528\u6237\u5DF2\u5B58\u5728'\n}";
export declare const adaptorReturnStruct =
  '{\n  "status": 0,\n  "msg": "",\n  "data": {\n    // ...\u5176\u4ED6\u5B57\u6BB5\n  }\n}';
export declare const adaptorEditorDescSchema: {
  type: string;
  className: string;
  style: {
    width: string;
    height: string;
  };
  body: (
    | string
    | {
        body: {
          type: string;
          language: string;
          className: string;
          value: string;
        };
        style?:
          | {
              width: string;
              height: string;
            }
          | undefined;
        type: string;
      }
    | {
        type: string;
        className: string;
        data: {
          items: {
            label: string;
            desc: string;
          }[];
        };
        columns: {
          name: string;
          label: string;
        }[];
      }
  )[];
};
export declare const validateApiAdaptorEditorDescSchema: {
  type: string;
  className: string;
  body: (
    | string
    | {
        type: string;
        className: string;
        data: {
          items: {
            label: string;
            desc: string;
          }[];
        };
        columns: {
          name: string;
          label: string;
        }[];
      }
  )[];
};
export {};
