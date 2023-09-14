import {BasePlugin} from 'amis-editor-core';
import type {SchemaObject} from 'amis';
export declare class AlertPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  icon: string;
  pluginIcon: string;
  tags: string[];
  scaffold: SchemaObject;
  previewSchema: any;
  regions: {
    key: string;
    label: string;
    placeholder: string;
  }[];
  notRenderFormZone: boolean;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
