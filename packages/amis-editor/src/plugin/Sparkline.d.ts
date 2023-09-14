/**
 * @file 走势图
 */
import {BasePlugin} from 'amis-editor-core';
export declare class SparklinePlugin extends BasePlugin {
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
    height: number;
    value: number[];
  };
  previewSchema: {
    type: string;
    height: number;
    value: number[];
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
