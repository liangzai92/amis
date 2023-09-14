import {RendererPluginEvent} from 'amis-editor-core';
import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class CollapseGroupPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    activeKey: string[];
    body: (
      | {
          type: string;
          key: string;
          active: boolean;
          header: string;
          body: {
            type: string;
            tpl: string;
            wrapperComponent: string;
            inline: boolean;
          }[];
        }
      | {
          type: string;
          key: string;
          header: string;
          body: {
            type: string;
            tpl: string;
            wrapperComponent: string;
            inline: boolean;
          }[];
          active?: undefined;
        }
    )[];
  };
  previewSchema: {
    type: string;
    activeKey: string[];
    body: (
      | {
          type: string;
          key: string;
          active: boolean;
          header: string;
          body: {
            type: string;
            tpl: string;
            wrapperComponent: string;
            inline: boolean;
          }[];
        }
      | {
          type: string;
          key: string;
          header: string;
          body: {
            type: string;
            tpl: string;
            wrapperComponent: string;
            inline: boolean;
          }[];
          active?: undefined;
        }
    )[];
  };
  events: RendererPluginEvent[];
  activeKeyData: any;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
  regions: Array<RegionConfig>;
}
