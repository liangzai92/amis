import {BasePlugin} from 'amis-editor-core';
import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import type {SchemaObject} from 'amis';
import {EditorNodeType} from 'amis-editor-core';
export declare class PagePlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  disabledRendererPlugin: boolean;
  description: string;
  docLink: string;
  tags: string;
  icon: string;
  scaffold: SchemaObject;
  previewSchema: SchemaObject;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  regions: (
    | {
        key: string;
        label: string;
        preferTag: string;
        placeholder?: undefined;
      }
    | {
        key: string;
        label: string;
        placeholder: string;
        preferTag?: undefined;
      }
  )[];
  wrapper: any;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType
  ): Promise<any>;
  rendererBeforeDispatchEvent(node: EditorNodeType, e: any, data: any): void;
}
