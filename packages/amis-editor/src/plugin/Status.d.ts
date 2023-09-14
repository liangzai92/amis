import {BasePlugin} from 'amis-editor-core';
export declare class StatusPlugin extends BasePlugin {
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
    value: number;
  };
  previewSchema: {
    type: string;
    value: number;
  };
  defaultSource: (
    | {
        label: string;
        value: string;
        icon: string;
        status: number;
      }
    | {
        label: string;
        value: string;
        icon: string;
        status: string;
      }
  )[];
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
