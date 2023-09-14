/**
 * @file 文字提示容器
 */
import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class TooltipWrapperPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  isBaseComponent: boolean;
  name: string;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    tooltip: string;
    body: {
      type: string;
      wrapperComponent: string;
      tpl: string;
    }[];
    enterable: boolean;
    showArrow: boolean;
    offset: number[];
  };
  previewSchema: {
    className: string;
    type: string;
    tooltip: string;
    body: {
      type: string;
      wrapperComponent: string;
      tpl: string;
    }[];
    enterable: boolean;
    showArrow: boolean;
    offset: number[];
  };
  regions: Array<RegionConfig>;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
