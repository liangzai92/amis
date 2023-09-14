import {
  BasePlugin,
  ChangeEventContext,
  BaseEventContext,
  PluginEvent,
  EditorManager,
  RendererPluginAction,
  RendererPluginEvent,
  EditorNodeType,
  ScaffoldForm,
  RegionConfig
} from 'amis-editor-core';
import {DSFeatureType, DSBuilderManager} from '../../builder';
import type {FormSchema} from 'amis/lib/Schema';
import type {Schema, RendererConfig} from 'amis-core';
export type FormPluginFeat = Extract<
  DSFeatureType,
  'Insert' | 'Edit' | 'BulkEdit' | 'View'
>;
export interface ExtendFormSchema extends FormSchema {
  feat?: FormPluginFeat;
  dsType?: string;
}
/** 动态注册的控件 */
export type FormDynamicControls = Partial<
  Record<string, (context: BaseEventContext) => any>
>;
export declare class FormPlugin extends BasePlugin {
  static id: string;
  name: string;
  panelTitle: string;
  rendererName: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  $schema: string;
  tags: string[];
  order: number;
  icon: string;
  pluginIcon: string;
  panelIcon: string;
  panelJustify: boolean;
  scaffold: {
    type: string;
    title: string;
    body: {
      label: string;
      type: string;
      name: string;
    }[];
  };
  previewSchema: {
    type: string;
    panelClassName: string;
    mode: string;
    body: {
      label: string;
      name: string;
      type: string;
    }[];
  };
  regions: Array<RegionConfig>;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  Features: Array<{
    label: string;
    value: DSFeatureType;
    disabled?: boolean;
  }>;
  dsManager: DSBuilderManager;
  protected _dynamicControls: FormDynamicControls;
  constructor(manager: EditorManager);
  /** 表单脚手架 */
  get scaffoldForm(): ScaffoldForm;
  get dynamicControls(): FormDynamicControls;
  set dynamicControls(controls: FormDynamicControls);
  panelBodyCreator: (context: BaseEventContext) => any[];
  /** 重新构建 API */
  panelFormPipeOut: (schema: any) => Promise<any>;
  afterUpdate(event: PluginEvent<ChangeEventContext>): void;
  buildDataSchemas(
    node: EditorNodeType,
    region: EditorNodeType,
    trigger?: EditorNodeType
  ): Promise<any>;
  rendererBeforeDispatchEvent(node: EditorNodeType, e: any, data: any): void;
  /**
   * 为了让 form 的按钮可以点击编辑
   */
  patchSchema(schema: Schema, info: RendererConfig, props: any): any;
  getAvailableContextFields(
    scopeNode: EditorNodeType,
    target: EditorNodeType,
    region?: EditorNodeType
  ): Promise<any>;
}
