import {BasePlugin} from 'amis-editor-core';
import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
export declare class ExcelControlPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    label: string;
    name: string;
  };
  previewSchema: any;
  panelTitle: string;
  notRenderFormZone: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any[];
}
