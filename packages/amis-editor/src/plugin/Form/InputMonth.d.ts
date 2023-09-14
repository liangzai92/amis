import {DateControlPlugin} from './InputDate';
export declare class MonthControlPlugin extends DateControlPlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  pluginIcon: string;
  icon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    name: string;
  };
  disabledRendererPlugin: boolean;
  previewSchema: any;
  panelTitle: string;
}
