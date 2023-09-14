import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class ControlPlugin extends BasePlugin {
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
  /**
   * 组件选择面板中隐藏，和Container合并
   */
  disabledRendererPlugin: boolean;
  scaffold: {
    type: string;
    label: string;
    body: {
      type: string;
      wrapperComponent: string;
      tpl: string;
    }[];
  };
  previewSchema: any;
  regions: Array<RegionConfig>;
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
