import {BasePlugin} from 'amis-editor-core';
export declare class ImagesPlugin extends BasePlugin {
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
    imageGallaryClassName: string;
  };
  previewSchema: {
    listClassName: string;
    thumbMode: string;
    value: {
      title: string;
      image: any;
      src: any;
    }[];
    type: string;
    imageGallaryClassName: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
