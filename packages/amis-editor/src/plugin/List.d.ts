import {EditorNodeType} from 'amis-editor-core';
import {
  BaseEventContext,
  BasePlugin,
  BasicRendererInfo,
  BasicToolbarItem,
  ContextMenuEventContext,
  ContextMenuItem,
  RendererInfoResolveEventContext
} from 'amis-editor-core';
export declare class ListPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  isListComponent: boolean;
  disabledRendererPlugin: boolean;
  memberImmutable: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    listItem: {
      body: {
        type: string;
        tpl: string;
        wrapperComponent: string;
      }[];
      actions: {
        icon: string;
        type: string;
      }[];
    };
  };
  previewSchema: {
    items: {
      a: number;
      b: number;
    }[];
    type: string;
    listItem: {
      body: {
        type: string;
        tpl: string;
        wrapperComponent: string;
      }[];
      actions: {
        icon: string;
        type: string;
      }[];
    };
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  filterProps(props: any): any;
  buildMockData(): {
    id: number;
    title: string;
    description: string;
    a: string;
    b: string;
  };
  editHeaderDetail(id: string): void;
  editFooterDetail(id: string): void;
  editDetail(id: string): void;
  buildEditorToolbar(
    {id, info, schema}: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  buildDataSchemas(node: EditorNodeType, region?: EditorNodeType): any;
  buildEditorContextMenu(
    {id, schema, region, info, selections}: ContextMenuEventContext,
    menus: Array<ContextMenuItem>
  ): void;
  getRendererInfo(
    context: RendererInfoResolveEventContext
  ): BasicRendererInfo | void;
}
