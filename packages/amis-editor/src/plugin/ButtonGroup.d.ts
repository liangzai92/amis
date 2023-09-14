import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class ButtonGroupPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  docLink: string;
  scaffold: {
    type: string;
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
  previewSchema: {
    type: string;
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
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  regions: Array<RegionConfig>;
}
