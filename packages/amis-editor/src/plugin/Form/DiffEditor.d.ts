import {BasePlugin} from 'amis-editor-core';
import {RendererPluginEvent, RendererPluginAction} from 'amis-editor-core';
export declare class DiffEditorControlPlugin extends BasePlugin {
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
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  notRenderFormZone: boolean;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  filterProps(props: any): any;
}
