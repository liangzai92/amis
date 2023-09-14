import {
  BasePlugin,
  BasicRendererInfo,
  RendererInfoResolveEventContext,
  ReplaceEventContext,
  PluginEvent,
  AfterBuildPanelBody,
  BaseEventContext
} from 'amis-editor-core';
export type TableCell2DynamicControls = Partial<
  Record<
    | 'name'
    | 'key'
    | 'sorter'
    | 'relationBuildSetting'
    | 'searchable'
    | 'quickEdit'
    | 'popover',
    (context: BaseEventContext) => any
  >
>;
export declare class TableCell2Plugin extends BasePlugin {
  static id: string;
  rendererName: string;
  panelTitle: string;
  panelIcon: string;
  panelJustify: boolean;
  /** 是否为操作列 */
  _isOpColumn?: boolean;
  /** NodeStore在构建时需要将一些信息添加进去 */
  getRendererInfo(
    context: RendererInfoResolveEventContext
  ): BasicRendererInfo | void;
  /** 更新渲染器前的事件，或者右键粘贴配置 */
  beforeReplace(event: PluginEvent<ReplaceEventContext>): void;
  afterBuildPanelBody(event: PluginEvent<AfterBuildPanelBody>): void;
  protected _dynamicControls: TableCell2DynamicControls;
  /** 需要动态控制的控件 */
  get dynamicControls(): TableCell2DynamicControls;
  set dynamicControls(controls: TableCell2DynamicControls);
  panelBodyCreator: (context: BaseEventContext) => any;
}
