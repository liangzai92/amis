import {BasePlugin} from 'amis-editor-core';
export declare class IFramePlugin extends BasePlugin {
  static id: string;
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
    src: string;
  };
  previewSchema: {
    type: string;
    tpl: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  renderRenderer(props: any): any;
}
