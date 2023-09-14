import {
  BaseEventContext,
  BasePlugin,
  BasicToolbarItem,
  ContextMenuEventContext,
  ContextMenuItem
} from 'amis-editor-core';
export declare class SubFormControlPlugin extends BasePlugin {
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
    form: {
      title: string;
      body: {
        type: string;
        label: string;
        name: string;
      }[];
    };
  };
  previewSchema: any;
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => SchemaCollection;
  filterProps(props: any): any;
  buildEditorToolbar(
    {id, info}: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  buildEditorContextMenu(
    {id, schema, region, info}: ContextMenuEventContext,
    menus: Array<ContextMenuItem>
  ): void;
  editDetail(id: string): void;
}
