import {TextControlPlugin} from './InputText';
export declare class PasswordControlPlugin extends TextControlPlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  scaffold: {
    type: string;
    label: string;
    name: string;
  };
  disabledRendererPlugin: boolean;
  previewSchema: {
    type: string;
    className: string;
    mode: string;
    wrapWithPanel: boolean;
    body: {
      type: string;
      label: string;
      name: string;
    };
  };
  panelTitle: string;
}
