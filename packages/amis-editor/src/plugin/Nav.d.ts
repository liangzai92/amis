import {
  BasePlugin,
  RendererPluginEvent,
  RendererPluginAction
} from 'amis-editor-core';
export declare class NavPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    stacked: boolean;
    links: {
      label: string;
      to: string;
      target: string;
      id: string;
    }[];
  };
  previewSchema: {
    type: string;
    stacked: boolean;
    links: {
      label: string;
      to: string;
      target: string;
      id: string;
    }[];
  };
  panelTitle: string;
  panelDefinitions: {
    links: {
      label: string;
      name: string;
      type: string;
      multiple: boolean;
      draggable: boolean;
      addButtonText: string;
      multiLine: boolean;
      messages: {
        validateFailed: string;
      };
      scaffold: {
        label: string;
        to: string;
      };
      items: any[];
    };
  };
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any;
}
