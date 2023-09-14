import {EditorNodeType} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class LocationControlPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  pluginIcon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    name: string;
    label: string;
  };
  previewSchema: any;
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  buildDataSchemas(
    node: EditorNodeType,
    region: EditorNodeType
  ): {
    type: string;
    title: any;
    properties: {
      city: {
        type: string;
        title: string;
      };
      address: {
        type: string;
        title: string;
      };
      lng: {
        type: string;
        title: string;
      };
      lat: {
        type: string;
        title: string;
      };
      vendor: {
        type: string;
        title: string;
      };
    };
    originalValue: any;
  };
}
