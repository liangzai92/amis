import {FlexPluginBase} from './FlexPluginBase';
export default class Layout_fixed extends FlexPluginBase {
  static id: string;
  static scene: string[];
  name: string;
  isBaseComponent: boolean;
  pluginIcon: string;
  description: string;
  order: number;
  scaffold: any;
  panelTitle: string;
}
