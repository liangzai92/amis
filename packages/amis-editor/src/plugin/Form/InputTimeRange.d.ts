import {DateRangeControlPlugin} from './InputDateRange';
export declare class TimeRangeControlPlugin extends DateRangeControlPlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  icon: string;
  pluginIcon: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    label: string;
    name: string;
  };
  previewSchema: any;
  disabledRendererPlugin: boolean;
  notRenderFormZone: boolean;
}
