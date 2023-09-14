import {
  BasePlugin,
  RendererPluginEvent,
  RendererPluginAction,
  RegionConfig,
  EditorNodeType,
  EditorManager
} from 'amis-editor-core';
import {DSBuilderManager} from '../../builder/DSBuilderManager';
export declare class ComboControlPlugin extends BasePlugin {
  static id: string;
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
    label: string;
    name: string;
    multiple: boolean;
    addable: boolean;
    removable: boolean;
    removableMode: string;
    addBtn: {
      label: string;
      icon: string;
      level: string;
      size: string;
    };
    items: (
      | {
          type: string;
          name: string;
          placeholder: string;
          options?: undefined;
        }
      | {
          type: string;
          name: string;
          placeholder: string;
          options: {
            label: string;
            value: string;
          }[];
        }
    )[];
  };
  previewSchema: any;
  regions: Array<RegionConfig>;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelTitle: string;
  notRenderFormZone: boolean;
  panelJustify: boolean;
  dsManager: DSBuilderManager;
  constructor(manager: EditorManager);
  panelBodyCreator: (context: BaseEventContext) => any;
  filterProps(props: any): any;
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType,
    parent?: EditorNodeType
  ): Promise<any>;
  getAvailableContextFields(
    scopeNode: EditorNodeType,
    target: EditorNodeType,
    region?: EditorNodeType
  ): Promise<any>;
}
