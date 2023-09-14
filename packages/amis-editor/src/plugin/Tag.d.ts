import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class TagPlugin extends BasePlugin {
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
  previewSchema: {
    type: string;
    label: string;
    color: string;
  };
  scaffold: any;
  panelTitle: string;
  panelJustify: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any;
}
