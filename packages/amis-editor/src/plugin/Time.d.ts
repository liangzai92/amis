import {DatePlugin} from './Date';
export declare class TimePlugin extends DatePlugin {
  static id: string;
  rendererName: string;
  name: string;
  isBaseComponent: boolean;
  pluginIcon: string;
  scaffold: {
    type: string;
    value: number;
    format: string;
  };
  previewSchema: {
    format: string;
    value: number;
    type: string;
  };
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
}
