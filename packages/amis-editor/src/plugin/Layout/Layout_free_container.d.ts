import {ContainerPlugin} from '../Container';
export default class Layout_free_container extends ContainerPlugin {
  static id: string;
  name: string;
  isBaseComponent: boolean;
  pluginIcon: string;
  description: string;
  tags: string[];
  scaffold: any;
  panelTitle: string;
}
