import {RendererPluginAction} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class OfficeViewerPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
  };
  previewSchema: {
    type: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any[];
}
