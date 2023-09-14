import {
  BasePlugin,
  InsertEventContext,
  PluginEvent,
  ScaffoldForm,
  RegionConfig,
  RendererPluginEvent,
  RendererPluginAction,
  EditorNodeType,
  EditorManager
} from 'amis-editor-core';
import {DSBuilderManager} from '../../builder/DSBuilderManager';
export declare class TableControlPlugin extends BasePlugin {
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
    name: string;
    label: string;
    columns: (
      | {
          label: string;
          name: string;
          quickEdit: {
            type: string;
            name: string;
            mode?: undefined;
            options?: undefined;
          };
        }
      | {
          label: string;
          name: string;
          quickEdit: {
            type: string;
            mode: string;
            name: string;
            options?: undefined;
          };
        }
      | {
          label: string;
          name: string;
          quickEdit: {
            type: string;
            name: string;
            options: {
              label: string;
              value: string;
            }[];
            mode?: undefined;
          };
        }
    )[];
    addable: boolean;
    footerAddBtn: {
      label: string;
      icon: string;
    };
    strictMode: boolean;
  };
  regions: Array<RegionConfig>;
  previewSchema: any;
  get scaffoldForm(): ScaffoldForm;
  notRenderFormZone: boolean;
  panelJustify: boolean;
  panelTitle: string;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  dsManager: DSBuilderManager;
  constructor(manager: EditorManager);
  panelBodyCreator: (context: BaseEventContext) => any;
  filterProps(props: any): any;
  beforeInsert(event: PluginEvent<InsertEventContext>): void;
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
