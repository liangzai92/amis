import {
  EditorNodeType,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class RangeControlPlugin extends BasePlugin {
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
  notRenderFormZone: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  buildDataSchemas(
    node: EditorNodeType,
    region: EditorNodeType
  ):
    | {
        type: string;
        title: any;
        properties: {
          max: {
            type: string;
            title: string;
          };
          min: {
            type: string;
            title: string;
          };
        };
        originalValue: any;
      }
    | {
        type: string;
        title: any;
        originalValue: any;
        properties?: undefined;
      };
}
