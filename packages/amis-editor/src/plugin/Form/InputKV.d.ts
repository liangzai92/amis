/**
 * @file input-kv 组件的素项目部
 */
import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class KVControlPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
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
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelTitle: string;
  panelBody: any[];
}
