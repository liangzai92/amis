import {LayoutBasePlugin, RegionConfig} from 'amis-editor-core';
export declare class WrapperPlugin extends LayoutBasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  disabledRendererPlugin: boolean;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
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
