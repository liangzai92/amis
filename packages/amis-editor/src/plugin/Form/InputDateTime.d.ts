import {DateControlPlugin} from './InputDate';
export declare class DateTimeControlPlugin extends DateControlPlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  name: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    label: string;
    name: string;
  };
  disabledRendererPlugin: boolean;
  previewSchema: any;
  panelTitle: string;
}
