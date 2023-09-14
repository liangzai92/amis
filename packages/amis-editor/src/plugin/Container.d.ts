import {
  LayoutBasePlugin,
  RegionConfig,
  RendererPluginEvent
} from 'amis-editor-core';
export declare class ContainerPlugin extends LayoutBasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  tags: string[];
  order: number;
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    body: never[];
    style: {
      position: string;
      display: string;
    };
    wrapperBody: boolean;
  };
  previewSchema: {
    type: string;
    body: never[];
    style: {
      position: string;
      display: string;
    };
    wrapperBody: boolean;
  };
  regions: Array<RegionConfig>;
  panelTitle: string;
  panelJustify: boolean;
  events: RendererPluginEvent[];
  panelBodyCreator: (context: BaseEventContext) => any;
}
