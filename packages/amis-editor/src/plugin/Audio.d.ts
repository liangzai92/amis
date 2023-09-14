import {BasePlugin} from 'amis-editor-core';
export declare class AudioPlugin extends BasePlugin {
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
  scaffold: {
    type: string;
    autoPlay: boolean;
    src: string;
  };
  previewSchema: {
    type: string;
    autoPlay: boolean;
    src: string;
  };
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
