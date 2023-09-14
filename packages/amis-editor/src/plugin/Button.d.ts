import {
  BasePlugin,
  BasicRendererInfo,
  RendererInfoResolveEventContext
} from 'amis-editor-core';
import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import type {SchemaObject} from 'amis';
export declare class ButtonPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  order: number;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: SchemaObject;
  previewSchema: any;
  panelTitle: string;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  /**
   * 如果禁用了没办法编辑
   */
  filterProps(props: any): any;
  /**
   * 如果配置里面有 rendererName 自动返回渲染器信息。
   * @param renderer
   */
  getRendererInfo({
    renderer,
    schema
  }: RendererInfoResolveEventContext): BasicRendererInfo | void;
}
