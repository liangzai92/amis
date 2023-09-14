/**
 * @file constants.ts
 * @desc builder 相关常量
 */
import {FormOperatorValue, FormOperator} from './type';
/**
 * 数据源所需操作，目前是因为schema从后端来
 */
export declare enum DSBehavior {
  /** 创建操作 */
  create = 'create',
  /** 查询操作 */
  view = 'view',
  /** 更新操作 */
  update = 'update',
  table = 'table',
  filter = 'filter'
}
/** 数据粒度 */
export declare enum DSGrain {
  /** 实体 */
  entity = 'entity',
  /** 多条数据 */
  list = 'list',
  /** 单条数据 */
  piece = 'piece'
}
/** 数据源所使用的功能场景 */
export declare const DSFeature: {
  List: {
    value: string;
    label: string;
  };
  Insert: {
    value: string;
    label: string;
  };
  View: {
    value: string;
    label: string;
  };
  Edit: {
    value: string;
    label: string;
  };
  Delete: {
    value: string;
    label: string;
  };
  BulkEdit: {
    value: string;
    label: string;
  };
  BulkDelete: {
    value: string;
    label: string;
  };
  Import: {
    value: string;
    label: string;
  };
  Export: {
    value: string;
    label: string;
  };
  SimpleQuery: {
    value: string;
    label: string;
  };
  FuzzyQuery: {
    value: string;
    label: string;
  };
  AdvancedQuery: {
    value: string;
    label: string;
  };
};
export declare enum DSFeatureEnum {
  List = 'List',
  Insert = 'Insert',
  View = 'View',
  Edit = 'Edit',
  Delete = 'Delete',
  BulkEdit = 'BulkEdit',
  BulkDelete = 'BulkDelete',
  Import = 'Import',
  Export = 'Export',
  SimpleQuery = 'SimpleQuery',
  FuzzyQuery = 'FuzzyQuery',
  AdvancedQuery = 'AdvancedQuery'
}
export declare const DSFeatureList: (
  | 'Edit'
  | 'View'
  | 'Delete'
  | 'List'
  | 'Insert'
  | 'Import'
  | 'Export'
  | 'BulkEdit'
  | 'BulkDelete'
  | 'SimpleQuery'
  | 'FuzzyQuery'
  | 'AdvancedQuery'
)[];
export declare const FormOperatorMap: Record<FormOperatorValue, FormOperator>;
export declare const ModelDSBuilderKey = 'model-entity';
