import {EditorNodeType, BasePlugin, RegionConfig} from 'amis-editor-core';
import {DSBuilderManager} from '../builder/DSBuilderManager';
import type {
  EditorManager,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
export declare class ServicePlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  name: string;
  panelTitle: string;
  icon: string;
  pluginIcon: string;
  panelIcon: string;
  $schema: string;
  isBaseComponent: boolean;
  order: number;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    /** region 区域的 placeholder 会撑开内容区 */
    body: never[];
  };
  previewSchema: {
    type: string;
    body: {
      type: string;
      tpl: string;
      inline: boolean;
      className: string;
    }[];
  };
  regions: Array<RegionConfig>;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  dsManager: DSBuilderManager;
  constructor(manager: EditorManager);
  panelBodyCreator: (context: BaseEventContext) => any;
  panelFormPipeOut: (schema: any) => Promise<any>;
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType
  ): Promise<any>;
  rendererBeforeDispatchEvent(node: EditorNodeType, e: any, data: any): void;
  getAvailableContextFields(
    scopeNode: EditorNodeType,
    node: EditorNodeType,
    region?: EditorNodeType
  ): Promise<any>;
}
