/**
 * @file ApiDsBuilder
 * @desc 外部 API 接口数据源构造器
 */
import {DSBuilder} from './DSBuilder';
import type {EditorNodeType} from 'amis-editor-core';
import type {ButtonSchema} from 'amis';
import type {
  DSRendererType,
  DSFeatureType,
  GenericSchema,
  FormOperatorValue,
  ScaffoldField,
  FormScaffoldConfig,
  CRUDScaffoldConfig
} from './type';
import type {DSBuilderBaseOptions} from './DSBuilder';
export interface ApiDSBuilderOptions<R extends DSRendererType>
  extends DSBuilderBaseOptions {
  /** 渲染器类型 */
  renderer: DSRendererType;
  /** 脚手架配置 */
  scaffoldConfig?: R extends 'crud' ? CRUDScaffoldConfig : FormScaffoldConfig;
  /** 配置面板设置 */
  sourceSettings?: {
    /** 数据源字段名 */
    name?: string;
    /** 数据源字段标题 */
    label?: any;
    renderLabel?: boolean;
    labelClassName?: string;
    mode?: 'horizontal' | 'normal';
    horizontalConfig?: {
      justify: boolean;
      left?: number;
      right?: number;
    };
    visibleOn?: string;
  };
  /** 字段管理配置 */
  fieldSettings?: {
    renderLabel?: boolean;
  };
  /** 控件配置 */
  controlSettings?: {
    fieldMapper?: <T extends Record<string, any>>(option: any) => T | false;
  };
}
export declare class ApiDSBuilder extends DSBuilder<
  ApiDSBuilderOptions<DSRendererType>
> {
  static key: string;
  isDefault: boolean;
  readonly name: string;
  readonly order: number;
  readonly features: (
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
  /**
   * 获取键值。
   */
  get key(): string;
  match(schema: any): boolean;
  getContextFields(
    options: ApiDSBuilderOptions<DSRendererType>
  ): Promise<never[]>;
  getAvailableContextFields<T extends DSRendererType>(
    options: ApiDSBuilderOptions<T>,
    target: EditorNodeType
  ): Promise<any>;
  getCRUDListFields<T extends Record<string, any>>(
    options: ApiDSBuilderOptions<DSRendererType>
  ): Promise<T[]>;
  getCRUDSimpleQueryFields<T extends Record<string, any>>(
    options: ApiDSBuilderOptions<DSRendererType>
  ): Promise<T[]>;
  makeSourceSettingForm(options: ApiDSBuilderOptions<DSRendererType>): any[];
  makeFieldsSettingForm(options: ApiDSBuilderOptions<DSRendererType>): {
    type: string;
    name: string;
    label: string | boolean;
    renderer: DSRendererType;
    feat:
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
      | 'AdvancedQuery';
    config: {
      showInputType: boolean;
      showDisplayType: boolean;
    };
    onAutoGenerateFields: any;
  }[];
  /** 基于接口生成字段 */
  autoGenerateFields({
    api,
    props,
    setState
  }: {
    api: any;
    props: Record<string, any>;
    setState: (state: any) => void;
  }): Promise<ScaffoldField[] | undefined>;
  getApiKey(
    options: Partial<{
      feat: DSFeatureType;
      [propName: string]: any;
    }>
  ): string;
  getFieldsKey(
    options: Partial<{
      feat: DSFeatureType;
      [propName: string]: any;
    }>
  ): string;
  buildBaseButtonSchema(
    options: ApiDSBuilderOptions<DSRendererType>,
    schemaPatch?: {
      formSchema: GenericSchema;
      buttonSchema?: {
        label?: string;
        level?: ButtonSchema['level'];
        order?: number;
        [propName: string]: any;
      };
      dialogSchema?: {
        title?: string;
        actions: GenericSchema[];
      };
      componentId?: string;
    }
  ): GenericSchema;
  /** 构建表单按钮操作区 */
  buildFormOperators(
    options: ApiDSBuilderOptions<'form'>,
    componentId: string
  ): {
    type: string;
    label: string;
    onEvent: {
      click: {
        actions: {
          actionType: FormOperatorValue;
          componentId: string;
        }[];
      };
    };
  }[];
  /**
   * 为输入类控件追加的初始化Schema配置，避免某些类型组件渲染报错
   */
  appendSchema2InputControl(inputType: string):
    | {
        items: {
          type: string;
          name: string;
          placeholder: string;
        }[];
      }
    | {
        items?: undefined;
      };
  buildBaseFormSchema(
    options: ApiDSBuilderOptions<DSRendererType>,
    schemaPatch?: GenericSchema,
    componentId?: string
  ):
    | {
        id?: string | undefined;
      }
    | {
        id: any;
      };
  buildInsertSchema<T extends DSRendererType>(
    options: ApiDSBuilderOptions<T>,
    componentId?: string
  ): Promise<
    | {
        id?: string | undefined;
      }
    | {
        id: any;
      }
  >;
  buildViewSchema(
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<{
    [x: string]: any;
  }>;
  buildEditSchema<T extends DSRendererType>(
    options: ApiDSBuilderOptions<T>,
    componentId?: string
  ): Promise<
    | {
        id?: string | undefined;
      }
    | {
        id: any;
      }
  >;
  buildBulkEditSchema<T extends DSRendererType>(
    options: ApiDSBuilderOptions<T>,
    componentId?: string
  ): Promise<
    | {
        id?: string | undefined;
      }
    | {
        id: any;
      }
  >;
  buildCRUDDeleteSchema(
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<{
    type: string;
    label: string;
    behavior: string;
    className: string;
    level: string;
    confirmText: string;
    onEvent: {
      click: {
        actions: (
          | {
              actionType: string;
              api: any;
              data: {
                '&': string;
              };
              groupType?: undefined;
              componentId?: undefined;
            }
          | {
              actionType: string;
              groupType: string;
              componentId: string | undefined;
              api?: undefined;
              data?: undefined;
            }
        )[];
      };
    };
  }>;
  buildCRUDBulkDeleteSchema(
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<{
    type: string;
    label: string;
    behavior: string;
    level: string;
    className: string;
    confirmText: string;
    disabledOn: string;
    onEvent: {
      click: {
        actions: (
          | {
              actionType: string;
              api: any;
              groupType?: undefined;
              componentId?: undefined;
            }
          | {
              actionType: string;
              groupType: string;
              componentId: string | undefined;
              api?: undefined;
            }
        )[];
      };
    };
  }>;
  buildSimpleQueryCollectionSchema(
    options: ApiDSBuilderOptions<'crud'>
  ): Promise<GenericSchema[] | undefined>;
  buildCRUDFilterSchema(
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<{
    type: string;
    title: string;
    mode: string;
    columnCount: number;
    clearValueOnHidden: boolean;
    behavior: string[];
    body: (
      | {
          items: {
            type: string;
            name: string;
            placeholder: string;
          }[];
          type: string;
          size: string;
          required: boolean;
          behavior: string;
          label: string;
          name: string;
        }
      | {
          items?: undefined;
          type: string;
          size: string;
          required: boolean;
          behavior: string;
          label: string;
          name: string;
        }
    )[];
    actions: (
      | {
          type: string;
          label: string;
          level?: undefined;
        }
      | {
          type: string;
          label: string;
          level: string;
        }
    )[];
  }>;
  buildCRUDOpColumn(
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<{
    type: string;
    title: string;
    buttons: {
      [x: string]: any;
    }[];
  }>;
  buildCRUDColumn(
    field: ScaffoldField,
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<{
    type: string;
    title: string;
    name: string;
  }>;
  buildCRUDColumnsSchema(
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<
    (
      | {
          type: string;
          title: string;
          name: string;
        }
      | {
          type: string;
          title: string;
          buttons: {
            [x: string]: any;
          }[];
        }
    )[]
  >;
  buildToolbarContainer(
    align: 'left' | 'right',
    body?: GenericSchema[],
    behaviors?: DSFeatureType[]
  ): {
    body: GenericSchema[];
    wrapperBody: boolean;
    style: {
      justifyContent?: string | undefined;
      flexGrow: number;
      flex: string;
      position: string;
      display: string;
      flexBasis: string;
      flexDirection: string;
      flexWrap: string;
      alignItems: string;
    };
    behavior?:
      | (
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
        )[]
      | undefined;
    type: string;
    align: 'left' | 'right';
  };
  buildToolbarFlex(
    position: 'header' | 'footer',
    left: GenericSchema[],
    right: GenericSchema[]
  ): {
    type: string;
    direction: string;
    justify: string;
    alignItems: string;
    style: {
      position: string;
    };
    items: {
      body: GenericSchema[];
      wrapperBody: boolean;
      style: {
        justifyContent?: string | undefined;
        flexGrow: number;
        flex: string;
        position: string;
        display: string;
        flexBasis: string;
        flexDirection: string;
        flexWrap: string;
        alignItems: string;
      };
      behavior?:
        | (
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
          )[]
        | undefined;
      type: string;
      align: 'left' | 'right';
    }[];
  }[];
  buildHeaderToolbar(
    options: ApiDSBuilderOptions<'crud'>,
    componentId?: string
  ): Promise<
    {
      type: string;
      direction: string;
      justify: string;
      alignItems: string;
      style: {
        position: string;
      };
      items: {
        body: GenericSchema[];
        wrapperBody: boolean;
        style: {
          justifyContent?: string | undefined;
          flexGrow: number;
          flex: string;
          position: string;
          display: string;
          flexBasis: string;
          flexDirection: string;
          flexWrap: string;
          alignItems: string;
        };
        behavior?:
          | (
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
            )[]
          | undefined;
        type: string;
        align: 'left' | 'right';
      }[];
    }[]
  >;
  buildFooterToolbar(
    options: ApiDSBuilderOptions<'crud'>,
    componentId: string
  ): {
    type: string;
    direction: string;
    justify: string;
    alignItems: string;
    style: {
      position: string;
    };
    items: {
      body: GenericSchema[];
      wrapperBody: boolean;
      style: {
        justifyContent?: string | undefined;
        flexGrow: number;
        flex: string;
        position: string;
        display: string;
        flexBasis: string;
        flexDirection: string;
        flexWrap: string;
        alignItems: string;
      };
      behavior?:
        | (
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
          )[]
        | undefined;
      type: string;
      align: 'left' | 'right';
    }[];
  }[];
  guessFormScaffoldConfig<FormScaffoldConfig>(options: {
    schema: GenericSchema;
    [propName: string]: any;
  }): FormScaffoldConfig;
  guessCRUDScaffoldConfig<CRUDScaffoldConfig>(options: {
    schema: GenericSchema;
    [propName: string]: any;
  }): CRUDScaffoldConfig;
  buildCRUDSchema(options: ApiDSBuilderOptions<'crud'>): Promise<{
    headerToolbar: {
      type: string;
      direction: string;
      justify: string;
      alignItems: string;
      style: {
        position: string;
      };
      items: {
        body: GenericSchema[];
        wrapperBody: boolean;
        style: {
          justifyContent?: string | undefined;
          flexGrow: number;
          flex: string;
          position: string;
          display: string;
          flexBasis: string;
          flexDirection: string;
          flexWrap: string;
          alignItems: string;
        };
        behavior?:
          | (
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
            )[]
          | undefined;
        type: string;
        align: 'left' | 'right';
      }[];
    }[];
    footerToolbar: {
      type: string;
      direction: string;
      justify: string;
      alignItems: string;
      style: {
        position: string;
      };
      items: {
        body: GenericSchema[];
        wrapperBody: boolean;
        style: {
          justifyContent?: string | undefined;
          flexGrow: number;
          flex: string;
          position: string;
          display: string;
          flexBasis: string;
          flexDirection: string;
          flexWrap: string;
          alignItems: string;
        };
        behavior?:
          | (
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
            )[]
          | undefined;
        type: string;
        align: 'left' | 'right';
      }[];
    }[];
    columns: (
      | {
          type: string;
          title: string;
          name: string;
        }
      | {
          type: string;
          title: string;
          buttons: {
            [x: string]: any;
          }[];
        }
    )[];
    filter?:
      | {
          type: string;
          title: string;
          mode: string;
          columnCount: number;
          clearValueOnHidden: boolean;
          behavior: string[];
          body: (
            | {
                items: {
                  type: string;
                  name: string;
                  placeholder: string;
                }[];
                type: string;
                size: string;
                required: boolean;
                behavior: string;
                label: string;
                name: string;
              }
            | {
                items?: undefined;
                type: string;
                size: string;
                required: boolean;
                behavior: string;
                label: string;
                name: string;
              }
          )[];
          actions: (
            | {
                type: string;
                label: string;
                level?: undefined;
              }
            | {
                type: string;
                label: string;
                level: string;
              }
          )[];
        }
      | undefined;
    quickSaveItemApi?: any;
    quickSaveApi?: any;
    loadType: string;
    primaryField: string;
    api: any;
    rowSelection?:
      | {
          type: string;
          keyField: string;
        }
      | undefined;
    id: any;
    type: string;
    mode: string;
    dsType: string;
    syncLocation: boolean;
    multiple: boolean | undefined;
  }>;
  buildFormSchema(options: ApiDSBuilderOptions<'form'>): Promise<
    | {
        dsType: string;
        initApi?: any;
      }
    | {
        id: any;
        dsType: string;
        initApi?: any;
      }
  >;
  buildApiSchema(
    options: ApiDSBuilderOptions<any>
  ): Promise<GenericSchema | undefined>;
}
