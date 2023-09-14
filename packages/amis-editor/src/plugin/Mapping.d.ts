import {
  BaseEventContext,
  BasePlugin,
  BasicToolbarItem,
  ContextMenuEventContext,
  ContextMenuItem
} from 'amis-editor-core';
export declare class MappingPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    value: number;
    map: {
      1: string;
      2: string;
      3: string;
      4: string;
      '*': string;
    };
    itemSchema: {
      type: string;
      label: string;
    };
  };
  previewSchema: {
    type: string;
    value: number;
    map: {
      1: string;
      2: string;
      3: string;
      4: string;
      '*': string;
    };
    itemSchema: {
      type: string;
      label: string;
    };
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
  getDisplayField(data: any): any;
  filterProps(props: any): any;
  buildEditorToolbar(
    {id, info, schema}: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  buildEditorContextMenu(
    {id, schema, region, info, selections}: ContextMenuEventContext,
    menus: Array<ContextMenuItem>
  ): void;
  editDetail(id: string): void;
}
