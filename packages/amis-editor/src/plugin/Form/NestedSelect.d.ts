import {
  EditorNodeType,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class NestedSelectControlPlugin extends BasePlugin {
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
    onlyChildren: boolean;
    options: (
      | {
          label: string;
          value: string;
          children?: undefined;
        }
      | {
          label: string;
          value: string;
          children: {
            label: string;
            value: string;
          }[];
        }
    )[];
  };
  previewSchema: any;
  panelTitle: string;
  notRenderFormZone: boolean;
  panelDefinitions: {
    options: {
      label: string;
      name: string;
      type: string;
      multiple: boolean;
      multiLine: boolean;
      draggable: boolean;
      addButtonText: string;
      scaffold: {
        label: string;
        value: string;
      };
      items: (
        | {
            type: string;
            body: any[];
            $ref?: undefined;
            label?: undefined;
            name?: undefined;
            addButtonText?: undefined;
          }
        | {
            $ref: string;
            label: string;
            name: string;
            addButtonText: string;
            type?: undefined;
            body?: undefined;
          }
      )[];
    };
  };
  panelJustify: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any;
  buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
}
