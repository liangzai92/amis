import {BasePlugin} from 'amis-editor-core';
export declare class InputGroupControlPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    name: string;
    label: string;
    body: (
      | {
          type: string;
          inputClassName: string;
          name: string;
          label?: undefined;
          level?: undefined;
        }
      | {
          type: string;
          label: string;
          level: string;
          inputClassName?: undefined;
          name?: undefined;
        }
    )[];
  };
  previewSchema: any;
  panelTitle: string;
  regions: {
    key: string;
    label: string;
    preferTag: string;
    renderMethod: string;
    matchRegion: (elem: JSX.Element) => boolean;
  }[];
  notRenderFormZone: boolean;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
}
