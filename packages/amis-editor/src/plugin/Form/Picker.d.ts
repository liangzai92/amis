import {EditorNodeType, RendererPluginEvent} from 'amis-editor-core';
import {
  BaseEventContext,
  BasePlugin,
  BasicToolbarItem,
  ContextMenuEventContext,
  ContextMenuItem
} from 'amis-editor-core';
export declare class PickerControlPlugin extends BasePlugin {
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
    options: {
      label: string;
      value: string;
    }[];
    modalClassName: string;
  };
  previewSchema: any;
  events: RendererPluginEvent[];
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any;
  buildEditorToolbar(
    {id, info}: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  buildEditorContextMenu(
    {id, schema, region, info}: ContextMenuEventContext,
    menus: Array<ContextMenuItem>
  ): void;
  editDetail(id: string): void;
  buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
}
