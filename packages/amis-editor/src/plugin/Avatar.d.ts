import {BasePlugin} from 'amis-editor-core';
export declare class AvatarPlugin extends BasePlugin {
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
    showtype: string;
    icon: string;
    fit: string;
    style: {
      width: number;
      height: number;
      borderRadius: number;
    };
  };
  previewSchema: any;
  notRenderFormZone: boolean;
  panelJustify: boolean;
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any;
}
