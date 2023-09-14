import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class ButtonToolbarControlPlugin extends BasePlugin {
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
    buttons: {
      onEvent: {
        click: {
          actions: never[];
        };
      };
      type: string;
      label: string;
    }[];
  };
  previewSchema: any;
  regions: Array<RegionConfig>;
  notRenderFormZone: boolean;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
