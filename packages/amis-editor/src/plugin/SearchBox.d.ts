import {
  BasePlugin,
  RendererPluginEvent,
  RendererPluginAction
} from 'amis-editor-core';
import type {Schema} from 'amis-core';
export declare class SearchBoxPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  searchKeywords: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  icon: string;
  pluginIcon: string;
  tags: string[];
  scaffold: Schema;
  previewSchema: any;
  regions: {
    key: string;
    label: string;
    placeholder: string;
  }[];
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  notRenderFormZone: boolean;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
