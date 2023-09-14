import {
  BasePlugin,
  BaseEventContext,
  PluginEvent,
  RegionConfig,
  RendererInfoResolveEventContext,
  BasicRendererInfo,
  InsertEventContext,
  ScaffoldForm,
  EditorNodeType,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
import {DSBuilderManager} from '../builder/DSBuilderManager';
import type {SchemaObject} from 'amis';
import type {EditorManager} from 'amis-editor-core';
export declare const Table2RenderereEvent: RendererPluginEvent[];
export declare const Table2RendererAction: RendererPluginAction[];
export type Table2DynamicControls = Partial<
  Record<
    | 'primaryField'
    | 'rowSelectionKeyField'
    | 'expandableKeyField'
    | 'quickSaveApi'
    | 'quickSaveItemApi'
    | 'draggable'
    | 'itemDraggableOn'
    | 'saveOrderApi'
    | 'columnTogglable',
    (context: BaseEventContext) => any
  >
>;
export declare class Table2Plugin extends BasePlugin {
  static id: string;
  disabledRendererPlugin: boolean;
  name: string;
  panelTitle: string;
  icon: string;
  panelIcon: string;
  pluginIcon: string;
  rendererName: string;
  isBaseComponent: boolean;
  panelJustify: boolean;
  $schema: string;
  description: string;
  docLink: string;
  scaffold: SchemaObject;
  regions: Array<RegionConfig>;
  previewSchema: any;
  scaffoldForm: ScaffoldForm;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  dsManager: DSBuilderManager;
  constructor(manager: EditorManager);
  getRendererInfo(
    context: RendererInfoResolveEventContext
  ): BasicRendererInfo | void;
  filterProps(props: any): any;
  beforeInsert(event: PluginEvent<InsertEventContext>): void;
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType
  ): Promise<any>;
  getAvailableContextFields(
    scopeNode: EditorNodeType,
    node: EditorNodeType,
    region?: EditorNodeType
  ): Promise<any>;
  protected _dynamicControls: Table2DynamicControls;
  /** 需要动态控制的控件 */
  get dynamicControls(): Table2DynamicControls;
  set dynamicControls(controls: Table2DynamicControls);
  isCRUDContext(context: BaseEventContext): boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
