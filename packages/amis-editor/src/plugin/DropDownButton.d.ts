import {
  BaseEventContext,
  BasePlugin,
  BasicToolbarItem,
  ContextMenuEventContext,
  ContextMenuItem
} from 'amis-editor-core';
export declare class DropDownButtonPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  docLink: string;
  scaffold: {
    type: string;
    label: string;
    buttons: {
      onEvent: {
        click: {
          actions: never[];
        };
      };
      type: string;
      label: string;
    }[];
  };
  previewSchema: {
    type: string;
    label: string;
    buttons: {
      onEvent: {
        click: {
          actions: never[];
        };
      };
      type: string;
      label: string;
    }[];
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  buildEditorToolbar(
    {id, info}: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  editDetail(id: string): void;
  buildEditorContextMenu(
    {id, schema, region, info, selections}: ContextMenuEventContext,
    menus: Array<ContextMenuItem>
  ): void;
  filterProps(props: any): any;
}
