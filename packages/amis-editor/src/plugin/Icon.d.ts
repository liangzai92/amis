import {RendererPluginEvent} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class IconPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  panelTitle: string;
  description: string;
  docLink: string;
  tags: string[];
  pluginIcon: string;
  scaffold: {
    type: string;
    icon: string;
    vendor: string;
  };
  previewSchema: any;
  events: RendererPluginEvent[];
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
