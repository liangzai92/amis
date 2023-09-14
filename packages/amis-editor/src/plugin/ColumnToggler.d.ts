import {
  BasePlugin,
  BasicRendererInfo,
  RendererInfoResolveEventContext
} from 'amis-editor-core';
export declare class ColumnToggler extends BasePlugin {
  static id: string;
  rendererName: string;
  name: string;
  panelTitle: string;
  icon: string;
  tags: string[];
  $schema: string;
  description: string;
  panelJustify: boolean;
  isBaseComponent: boolean;
  disabledRendererPlugin: boolean;
  crudInfo: {
    id: any;
    columns: any[];
    schema: any;
  };
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
