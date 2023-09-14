import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class PlainPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  disabledRendererPlugin: boolean;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  previewSchema: {
    type: string;
    text: string;
    className: string;
    inline: boolean;
  };
  scaffold: any;
  panelTitle: string;
  panelJustify: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any[];
}
