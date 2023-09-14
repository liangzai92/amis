import {
  ActiveEventContext,
  BasePlugin,
  PluginEvent,
  ResizeMoveEventContext
} from 'amis-editor-core';
export declare class ImagePlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
  };
  previewSchema: {
    thumbMode: string;
    value: any;
    type: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  onActive(event: PluginEvent<ActiveEventContext>): void;
  onWidthChangeStart(
    event: PluginEvent<
      ResizeMoveEventContext,
      {
        onMove(e: MouseEvent): void;
        onEnd(e: MouseEvent): void;
      }
    >
  ): void;
  onHeightChangeStart(
    event: PluginEvent<
      ResizeMoveEventContext,
      {
        onMove(e: MouseEvent): void;
        onEnd(e: MouseEvent): void;
      }
    >
  ): void;
  onSizeChangeStart(
    event: PluginEvent<
      ResizeMoveEventContext,
      {
        onMove(e: MouseEvent): void;
        onEnd(e: MouseEvent): void;
      }
    >,
    direction?: 'both' | 'vertical' | 'horizontal'
  ): void;
}
