import {
  BaseEventContext,
  BasePlugin,
  BasicPanelItem,
  BasicToolbarItem,
  BuildPanelEventContext
} from 'amis-editor-core';
export declare class ActionPlugin extends BasePlugin {
  static id: string;
  panelTitle: string;
  rendererName: string;
  name: string;
  $schema: string;
  panelBodyCreator: (context: BaseEventContext) => SchemaCollection;
  buildEditorPanel(
    context: BuildPanelEventContext,
    panels: Array<BasicPanelItem>
  ): void;
  buildEditorToolbar(
    {id, schema, info}: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  editDetail(id: string): void;
}
