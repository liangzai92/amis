import {DatePlugin} from './Date';
export declare class DatetimePlugin extends DatePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  scaffold: {
    type: string;
    value: number;
  };
  name: string;
  isBaseComponent: boolean;
  pluginIcon: string;
  previewSchema: {
    format: string;
    value: number;
    type: string;
  };
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
