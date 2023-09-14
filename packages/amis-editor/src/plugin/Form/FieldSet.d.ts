import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class FieldSetControlPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  icon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    title: string;
    collapsable: boolean;
    body: {
      type: string;
      label: string;
      name: string;
    }[];
  };
  previewSchema: any;
  regions: Array<RegionConfig>;
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any[];
  filterProps(props: any): any;
}
