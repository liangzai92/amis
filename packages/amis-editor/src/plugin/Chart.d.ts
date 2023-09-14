import {
  BasePlugin,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
export declare class ChartPlugin extends BasePlugin {
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
    config: {
      xAxis: {
        type: string;
        data: string[];
      };
      yAxis: {
        type: string;
      };
      series: {
        data: number[];
        type: string;
      }[];
      backgroundColor: string;
    };
    replaceChartOption: boolean;
  };
  previewSchema: {
    type: string;
    config: {
      xAxis: {
        type: string;
        data: string[];
      };
      yAxis: {
        type: string;
      };
      series: {
        data: number[];
        type: string;
      }[];
      backgroundColor: string;
    };
    replaceChartOption: boolean;
  };
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
  editDrillDown(id: string): void;
}
