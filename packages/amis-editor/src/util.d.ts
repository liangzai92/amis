/**
 * 布局配置项，数值设置时需要
 */
export declare const isAuto: (value: any) => boolean;
/**
 * 用于列表类展示组件在 filterProps 中获取编辑态 value 值
 */
export declare const resolveArrayDatasource: (
  {
    data,
    value,
    source
  }: {
    value?: any;
    data: any;
    source: string;
  },
  defaultSource?: string
) => any;
export declare const schemaToArray: (value: any) => any[];
export declare const schemaArrayFormat: (value: any) => any;
/**
 * 解析选项值类型
 * @param options
 * @returns
 */
export declare const resolveOptionType: (
  options: any
) =>
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';
/**
 * 将组件配置里面的公式进行转义，一般是文本组件编辑器里直接显示公式所用
 *
 * @param conf 组件schema 配置
 * @param keys 转义的字段key列表
 * @returns 转义后的配置
 */
export declare function escapeFormula(conf: any, keys?: string[]): any;
