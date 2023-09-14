import {EditorNodeType} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
export declare class TransferPlugin extends BasePlugin {
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
    label: string;
    type: string;
    name: string;
    options: {
      label: string;
      value: string;
    }[];
    selectMode: string;
    resultListModeFollowSelect: boolean;
  };
  previewSchema: any;
  panelTitle: string;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
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
  notRenderFormZone: boolean;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
}
