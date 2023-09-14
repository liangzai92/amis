import {BasePlugin} from 'amis-editor-core';
export declare class LinkPlugin extends BasePlugin {
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
    value: string;
  };
  previewSchema: {
    label: string;
    type: string;
    value: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBody: any[];
}
