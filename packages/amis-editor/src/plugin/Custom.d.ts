/**
 * @file 自定义代码
 */
import {
  BasePlugin,
  BasicSubRenderInfo,
  RendererEventContext,
  SubRendererInfo
} from 'amis-editor-core';
export declare class CustomPlugin extends BasePlugin {
  static id: string;
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
    html: string;
    onMount: string;
  };
  previewSchema: {
    type: string;
    html: string;
    onMount: string;
  };
  panelTitle: string;
  panelBody: any[];
  buildSubRenderers(
    context: RendererEventContext,
    renderers: Array<SubRendererInfo>
  ): BasicSubRenderInfo | Array<BasicSubRenderInfo> | void;
}
