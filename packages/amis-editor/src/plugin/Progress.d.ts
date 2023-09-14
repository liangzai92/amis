import {BasePlugin} from 'amis-editor-core';
export declare class ProgressPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  searchKeywords: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    mode: string;
    value: number;
    strokeWidth: number;
    valueTpl: string;
  };
  previewSchema: {
    type: string;
    mode: string;
    value: number;
    strokeWidth: number;
    valueTpl: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
