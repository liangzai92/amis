import {BasePlugin, RegionConfig} from 'amis-editor-core';
export declare class PaginationPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  tags: string[];
  icon: string;
  lastLayoutSetting: string[];
  layoutOptions: {
    text: string;
    value: string;
    checked: boolean;
  }[];
  scaffold: {
    type: string;
    mode: string;
    layout: string[];
    activePage: number;
    lastPage: number;
    total: number;
    hasNext: boolean;
    disabled: boolean;
    perPageAvailable: number[];
    perPage: number;
    maxButtons: number;
  };
  previewSchema: {
    type: string;
    mode: string;
    layout: string[];
    activePage: number;
    lastPage: number;
    total: number;
    hasNext: boolean;
    disabled: boolean;
    perPageAvailable: number[];
    perPage: number;
    maxButtons: number;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  regions: Array<RegionConfig>;
}
