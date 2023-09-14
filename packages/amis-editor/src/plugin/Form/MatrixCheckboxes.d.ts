import {
  BasePlugin,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
export declare class MatrixControlPlugin extends BasePlugin {
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
    name: string;
    label: string;
    rowLabel: string;
    columns: {
      label: string;
    }[];
    rows: {
      label: string;
    }[];
  };
  previewSchema: any;
  notRenderFormZone: boolean;
  panelTitle: string;
  panelJustify: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any;
}
