import {BasePlugin} from 'amis-editor-core';
export declare class RichTextControlPlugin extends BasePlugin {
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
    label: string;
    name: string;
    vendor: string;
  };
  previewSchema: any;
  panelTitle: string;
  notRenderFormZone: boolean;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
