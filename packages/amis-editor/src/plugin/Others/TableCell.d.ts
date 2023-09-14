import {
  BasePlugin,
  BasicRendererInfo,
  RendererInfoResolveEventContext,
  ReplaceEventContext,
  PluginEvent
} from 'amis-editor-core';
export declare class TableCellPlugin extends BasePlugin {
  static id: string;
  panelTitle: string;
  panelIcon: string;
  panelBodyCreator: (context: BaseEventContext) => any[];
  getRendererInfo({
    renderer,
    schema
  }: RendererInfoResolveEventContext): BasicRendererInfo | void;
  beforeReplace(event: PluginEvent<ReplaceEventContext>): void;
}
