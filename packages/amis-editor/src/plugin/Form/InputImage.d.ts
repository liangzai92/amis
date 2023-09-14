import {
  RendererPluginAction,
  RendererPluginEvent,
  BasePlugin
} from 'amis-editor-core';
export declare class ImageControlPlugin extends BasePlugin {
  static id: string;
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
    label: string;
    name: string;
    autoUpload: boolean;
    proxy: boolean;
    uploadType: string;
    imageClassName: string;
  };
  previewSchema: any;
  notRenderFormZone: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
