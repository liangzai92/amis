import {BasePlugin} from 'amis-editor-core';
export declare class FormulaControlPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  disabledRendererPlugin: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    name: string;
  };
  previewSchema: any;
  panelTitle: string;
  panelBody: any[];
  renderRenderer(props: any): any;
}
