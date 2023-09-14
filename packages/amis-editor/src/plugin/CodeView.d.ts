import {BasePlugin} from 'amis-editor-core';
export declare class CodeViewPlugin extends BasePlugin {
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
  scaffold: {
    type: string;
    language: string;
    value: string;
  };
  previewSchema: any;
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any;
}
