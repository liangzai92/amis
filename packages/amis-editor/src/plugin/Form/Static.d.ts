import {BasePlugin} from 'amis-editor-core';
import {EditorNodeType} from 'amis-editor-core';
export declare class StaticControlPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  disabledRendererPlugin: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    label: string;
  };
  previewSchema: any;
  multifactor: boolean;
  notRenderFormZone: boolean;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  filterProps(props: any, node: EditorNodeType): any;
}
