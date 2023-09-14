import {
  EditorNodeType,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class NumberControlPlugin extends BasePlugin {
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
    keyboard: boolean;
  };
  previewSchema: any;
  notRenderFormZone: boolean;
  panelTitle: string;
  panelJustify: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any;
  buildDataSchemas(
    node: EditorNodeType,
    region: EditorNodeType
  ): {
    type: string;
    title: any;
    originalValue: any;
  };
}
