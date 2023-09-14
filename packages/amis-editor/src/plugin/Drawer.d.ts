import {BasePlugin, RegionConfig, EditorNodeType} from 'amis-editor-core';
import {InlineModal} from './Dialog';
export declare class DrawerPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  wrapperProps: {
    wrapperComponent: typeof InlineModal;
    onClose: any;
    resizable: boolean;
    show: boolean;
  };
  regions: Array<RegionConfig>;
  events: {
    eventName: string;
    eventLabel: string;
    description: string;
    dataSchema: {
      type: string;
      properties: {
        data: {
          type: string;
          title: string;
          description: string;
        };
      };
    }[];
  }[];
  actions: {
    actionType: string;
    actionLabel: string;
    description: string;
  }[];
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  buildSubRenderers(): void;
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType
  ): Promise<{
    $id: string;
    type: string;
    title: any;
    properties: any;
  }>;
}
