import {
  BasePlugin,
  ContextMenuEventContext,
  ContextMenuItem,
  RegionConfig
} from 'amis-editor-core';
export declare class GroupControlPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  disabledRendererPlugin: boolean;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    body: {
      type: string;
      label: string;
      name: string;
    }[];
    label: boolean;
  };
  previewSchema: any;
  regions: Array<RegionConfig>;
  panelTitle: string;
  panelBody: any[];
  buildEditorContextMenu(
    {id, schema, region, selections, info}: ContextMenuEventContext,
    menus: Array<ContextMenuItem>
  ): void;
}
