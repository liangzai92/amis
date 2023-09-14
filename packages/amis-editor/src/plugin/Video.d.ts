import {BasePlugin} from 'amis-editor-core';
export declare class VideoPlugin extends BasePlugin {
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
    autoPlay: boolean;
    src: string;
    poster: any;
  };
  previewSchema: {
    type: string;
    autoPlay: boolean;
    src: string;
    poster: any;
  };
  panelTitle: string;
  panelBody: any[];
  filterProps(props: any): any;
}
