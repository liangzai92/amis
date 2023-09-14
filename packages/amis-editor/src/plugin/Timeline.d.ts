import {BasePlugin, BaseEventContext} from 'amis-editor-core';
export declare class TimelinePlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  label: '时间轴';
  type: 'timeline';
  name: string;
  isBaseComponent: boolean;
  icon: string;
  description: string;
  docLink: string;
  tags: string[];
  scaffold: {
    type: string;
    label: string;
    name: string;
    items: {
      time: string;
      title: string;
    }[];
  };
  previewSchema: {
    type: string;
    label: string;
    name: string;
    items: {
      time: string;
      title: string;
    }[];
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  editDetail(context: BaseEventContext): void;
}
