import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class Card2Plugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  disabledRendererPlugin: boolean;
  description: string;
  tags: string[];
  icon: string;
  scaffold: {
    type: string;
    body: string;
  };
  previewSchema: {
    type: string;
    body: string;
  };
  regions: Array<RegionConfig>;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
