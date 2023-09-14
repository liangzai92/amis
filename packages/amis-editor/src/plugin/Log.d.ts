import {BasePlugin} from 'amis-editor-core';
export declare class LogPlugin extends BasePlugin {
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
  previewSchema: {
    type: string;
    height: number;
    autoScroll: boolean;
  };
  scaffold: any;
  panelJustify: boolean;
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any;
}
