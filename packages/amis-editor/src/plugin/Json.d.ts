import {BasePlugin} from 'amis-editor-core';
export declare class JsonPlugin extends BasePlugin {
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
  };
  previewSchema: {
    name: string;
    value: {
      a: number;
      b: {
        c: number;
      };
    };
    type: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
