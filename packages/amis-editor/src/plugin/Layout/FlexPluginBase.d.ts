/**
 * @file Flex 常见布局 1:3
 */
import {LayoutBasePlugin, PluginEvent} from 'amis-editor-core';
import type {
  BaseEventContext,
  RegionConfig,
  RendererJSONSchemaResolveEventContext,
  BasicToolbarItem
} from 'amis-editor-core';
export declare const defaultFlexColumnSchema: (title?: string) => {
  type: string;
  body: never[];
  size: string;
  style: {
    position: string;
    display: string;
    flex: string;
    flexGrow: number;
    flexBasis: string;
  };
  wrapperBody: boolean;
  isFixedHeight: boolean;
  isFixedWidth: boolean;
};
export declare class FlexPluginBase extends LayoutBasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  disabledRendererPlugin: boolean;
  name: string;
  order: number;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: any;
  previewSchema: any;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
  regions: Array<RegionConfig>;
  buildEditorToolbar(
    {id, info, schema}: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  afterResolveJsonSchema(
    event: PluginEvent<RendererJSONSchemaResolveEventContext>
  ): void;
}
