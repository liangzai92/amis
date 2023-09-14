import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class CollapsePlugin extends BasePlugin {
  static id: string;
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
    header: string;
    body: {
      type: string;
      tpl: string;
      wrapperComponent: string;
      inline: boolean;
    }[];
  };
  previewSchema: {
    type: string;
    header: string;
    body: {
      type: string;
      tpl: string;
      wrapperComponent: string;
      inline: boolean;
    }[];
  };
  panelTitle: string;
  panelJustify: boolean;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelBodyCreator: (context: BaseEventContext) => any;
  regions: Array<RegionConfig>;
}
