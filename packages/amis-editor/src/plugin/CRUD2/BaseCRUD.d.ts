/**
 * @file BaseCRUD
 * @desc CRUD2 配置面板的基类
 */
import {
  BasePlugin,
  ScaffoldForm,
  EditorManager,
  EditorNodeType,
  BuildPanelEventContext,
  RendererPluginEvent,
  RendererPluginAction
} from 'amis-editor-core';
import {DSBuilderManager} from '../../builder';
import {CRUD2Schema} from 'amis/lib/renderers/CRUD2';
/** 需要动态控制的属性 */
export type CRUD2DynamicControls = Partial<
  Record<
    'columns' | 'toolbar' | 'filters' | 'primaryField',
    (context: BuildPanelEventContext) => any
  >
>;
export declare class BaseCRUDPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  name: string;
  panelTitle: string;
  subPanelTitle: string;
  icon: string;
  panelIcon: string;
  subPanelIcon: string;
  pluginIcon: string;
  panelJustify: boolean;
  multifactor: boolean;
  order: number;
  $schema: string;
  docLink: string;
  tags: string[];
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  scaffold: CRUD2Schema;
  scaffoldFormCache?: ScaffoldForm;
  dsManager: DSBuilderManager;
  constructor(
    manager: EditorManager,
    events?: RendererPluginEvent[],
    actions?: RendererPluginAction[]
  );
  get scaffoldForm(): ScaffoldForm;
  /** 各场景字段设置 Schema */
  getScaffoldFeatureTab(): {
    title: string;
    icon: string;
    body: any;
    visibleOn: string;
  }[];
  protected _dynamicControls: CRUD2DynamicControls;
  /** 需要动态控制的控件 */
  get dynamicControls(): CRUD2DynamicControls;
  set dynamicControls(controls: CRUD2DynamicControls);
  /** CRUD公共配置面板 */
  baseCRUDPanelBody: (context: BuildPanelEventContext) => any;
  /** 拆解一下 CURD 的基础面板配置，方便不同 mode 下模块化组合 */
  /** 属性面板 */
  renderPropsTab(context: BuildPanelEventContext): {
    title: string;
    className: string;
    body: any[];
  };
  /** 基础配置 */
  renderBasicPropsCollapse(context: BuildPanelEventContext): {
    title: string;
    order: number;
    body: any[];
  };
  renderColumnsControl(context: BuildPanelEventContext): {
    title: string;
    order: number;
    body: {
      type: string;
      name: string;
      nodeId: any;
      builder: import('../../builder').DSBuilderInterface<
        import('../../builder').DSBuilderBaseOptions
      >;
    }[];
  };
  renderToolbarCollapse(context: BuildPanelEventContext): {
    order: number;
    title: string;
    body: {
      type: string;
      name: string;
      nodeId: any;
      builder: import('../../builder').DSBuilderInterface<
        import('../../builder').DSBuilderBaseOptions
      >;
    }[];
  };
  renderFiltersCollapse(context: BuildPanelEventContext):
    | {
        order: number;
        title: string;
        body: any[];
      }
    | undefined;
  /** 分页类别 */
  renderPaginationCollapse(context: BuildPanelEventContext): {
    order: number;
    title: string;
    body: any[];
  };
  /** 其他类别 */
  renderOthersCollapse(context: BuildPanelEventContext): {
    order: number;
    title: string;
    body: any[];
  };
  /** 外观面板 */
  renderStylesTab(context: BuildPanelEventContext): {
    title: string;
    className: string;
    body: any;
  };
  /** 事件面板 */
  renderEventTab(context: BuildPanelEventContext): {
    title: string;
    className: string;
    body: any[];
  };
  /** 重新构建 API */
  panelFormPipeOut: (schema: any) => Promise<any>;
  emptyContainer: (
    align?: 'left' | 'right',
    body?: any[]
  ) => {
    type: string;
    body: any[];
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
  };
  emptyFlex: (items?: any[]) => {
    type: string;
    items: any[];
    style: {
      position: string;
    };
    direction: string;
    justify: string;
    alignItems: string;
  };
  addFeatToToolbar(
    schema: any,
    content: any,
    position: 'header' | 'footer',
    align: 'left' | 'right'
  ): void;
  buildDataSchemas(node: EditorNodeType, region?: EditorNodeType): Promise<any>;
  getAvailableContextFields(
    scopeNode: EditorNodeType,
    node: EditorNodeType,
    region?: EditorNodeType
  ): Promise<any>;
  generateScaffold(mode: 'table2' | 'cards' | 'list'): any;
  /** 生成预览 Schema */
  generatePreviewSchema: (mode: 'table2' | 'cards' | 'list') =>
    | {
        card: {
          body: any;
          actions: {
            type: string;
            level: string;
            icon: string;
            actionType: string;
            dialog: {
              title: string;
              body: {
                type: string;
                body: {
                  label: string;
                  name: string;
                  type: string;
                }[];
              };
            };
          };
        };
        listItem?: undefined;
        actions?: undefined;
        columns?: undefined;
        type: string;
        mode: 'list' | 'table2' | 'cards';
        source: string;
        data: {
          items: {
            engine: string;
            browser: string;
            platform: string;
            version: string;
            grade: string;
          }[];
        };
      }
    | {
        listItem: {
          body: {
            type: string;
            columns: any;
          };
        };
        actions: {
          type: string;
          level: string;
          icon: string;
          actionType: string;
          dialog: {
            title: string;
            body: {
              type: string;
              body: {
                label: string;
                name: string;
                type: string;
              }[];
            };
          };
        };
        card?: undefined;
        columns?: undefined;
        type: string;
        mode: 'list' | 'table2' | 'cards';
        source: string;
        data: {
          items: {
            engine: string;
            browser: string;
            platform: string;
            version: string;
            grade: string;
          }[];
        };
      }
    | {
        columns: any;
        card?: undefined;
        listItem?: undefined;
        actions?: undefined;
        type: string;
        mode: 'list' | 'table2' | 'cards';
        source: string;
        data: {
          items: {
            engine: string;
            browser: string;
            platform: string;
            version: string;
            grade: string;
          }[];
        };
      };
}
