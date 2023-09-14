export declare function findAndUpdate<T = any>(
  arr: T[],
  compareFn: (item: T) => boolean,
  target?: T
): T[];
/** 深度删除 */
export declare const deepRemove: (
  obj: any,
  predicate: (obj: any) => boolean,
  checkAll?: boolean
) => any;
export declare const findObj: (
  obj: any,
  predicate: (obj: any) => boolean,
  stop?: ((obj: any) => boolean) | undefined
) => any | void;
/** schema 中查找 */
export declare const findSchema: (
  schema: any,
  predicate: (obj: any) => boolean,
  ...scope: string[]
) => any;
/** headerToolbar 和 footerToolbar 布局换成 flex 包裹 container */
export declare const addSchema2Toolbar: (
  schema: any,
  content: any,
  position: 'header' | 'footer',
  align: 'left' | 'right'
) => void;
