import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class TplPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  order: number;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  previewSchema: {
    type: string;
    tpl: string;
  };
  scaffold: any;
  panelTitle: string;
  panelJustify: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any;
  popOverBody: any[];
}
