/**
 * @file utils
 * @desc builder用到的 utils
 */
import type {DSFeatureType} from './type';
export declare const getFeatValueByKey: (feat: DSFeatureType) => string;
export declare const getFeatLabelByKey: (feat: DSFeatureType) => string;
export declare const traverseSchemaDeep: (
  schema: Record<string, any>,
  mapper: (originKey: string, originValue: any, origin: any) => any[]
) => any;
/** CRUD列类型转 Form 表单类型 */
export declare const displayType2inputType: (inputType: string) => string;
