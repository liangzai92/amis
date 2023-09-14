import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import {
  BasePlugin,
  PluginEvent,
  RegionConfig,
  RendererInfoResolveEventContext,
  BasicRendererInfo,
  InsertEventContext,
  ScaffoldForm
} from 'amis-editor-core';
import {DSBuilderManager} from '../builder/DSBuilderManager';
import {EditorNodeType} from 'amis-editor-core';
import type {SchemaObject} from 'amis';
import type {EditorManager} from 'amis-editor-core';
export declare class TablePlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  tags: string[];
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  icon: string;
  pluginIcon: string;
  scaffold: SchemaObject;
  regions: Array<RegionConfig>;
  previewSchema: any;
  get scaffoldForm(): ScaffoldForm;
  panelTitle: string;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelJustify: boolean;
  dsManager: DSBuilderManager;
  constructor(manager: EditorManager);
  panelBodyCreator: (context: BaseEventContext) => any;
  filterProps(props: any): any;
  getRendererInfo(
    context: RendererInfoResolveEventContext
  ): BasicRendererInfo | void;
  beforeInsert(event: PluginEvent<InsertEventContext>): void;
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType,
    parent?: EditorNodeType
  ): Promise<any>;
  getAvailableContextFields(
    scopeNode: EditorNodeType,
    node: EditorNodeType,
    region?: EditorNodeType
  ): Promise<any>;
  editHeaderDetail(id: string): void;
  editFooterDetail(id: string): void;
  unWatchWidthChange: {
    [propName: string]: () => void;
  };
  componentRef(node: EditorNodeType, ref: any): void;
}
