/**
 * @file Timeline组件节点的可视化编辑控件
 */
import React from 'react';
import Sortable from 'sortablejs';
import type {FormControlProps} from 'amis-core';
import type {SchemaApi} from 'amis';
type TimelineItem = {
  title: string;
  time: string;
  detail?: string;
  otherConfig?: boolean;
  detailCollapsedText?: string;
  detailExpandedText?: string;
  color?: string | 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
};
export interface TimelineItemProps extends FormControlProps {
  className?: string;
}
export interface TimelineItemState {
  items: Array<Partial<TimelineItem>>;
  source: 'custom' | 'api' | 'variable';
  api: SchemaApi;
}
export default class TimelineItemControl extends React.Component<
  TimelineItemProps,
  TimelineItemState
> {
  sortable?: Sortable;
  drag?: HTMLElement | null;
  target: HTMLElement | null;
  constructor(props: TimelineItemProps);
  /**
   * 切换选项类型
   */
  handleSourceChange(source: 'custom' | 'api' | 'variable'): void;
  handleAPIChange(source: SchemaApi): void;
  onChange(): void;
  toggleEdit(values: TimelineItem, index: number): void;
  toggleCopy(index: number): void;
  toggleDelete(index: number): void;
  handleEditLabel(index: number, value: string, attr: 'time' | 'title'): void;
  handleBatchAdd(
    values: {
      batchItems: string;
    },
    action: any
  ): void;
  handleAdd(values: TimelineItem): void;
  buildAddOrEditSchema(props?: Partial<TimelineItem>): any[];
  buildBatchAddSchema(): {
    type: string;
    actionType: string;
    label: string;
    dialog: {
      title: string;
      headerClassName: string;
      closeOnEsc: boolean;
      closeOnOutside: boolean;
      showCloseButton: boolean;
      body: (
        | {
            type: string;
            level: string;
            body: {
              type: string;
              tpl: string;
            }[];
            showIcon: boolean;
            className: string;
            wrapWithPanel?: undefined;
            mode?: undefined;
            wrapperComponent?: undefined;
            resetAfterSubmit?: undefined;
            autoFocus?: undefined;
            preventEnterSubmit?: undefined;
            horizontal?: undefined;
          }
        | {
            type: string;
            wrapWithPanel: boolean;
            mode: string;
            wrapperComponent: string;
            resetAfterSubmit: boolean;
            autoFocus: boolean;
            preventEnterSubmit: boolean;
            horizontal: {
              left: number;
              right: number;
            };
            body: {
              name: string;
              type: string;
              label: string;
              placeholder: string;
              trimContents: boolean;
              minRows: number;
              maxRows: number;
              required: boolean;
            }[];
            level?: undefined;
            showIcon?: undefined;
            className?: undefined;
          }
      )[];
    };
  };
  buildAddSchema(): {
    type: string;
    actionType: string;
    label: string;
    active: boolean;
    dialog: {
      title: string;
      headerClassName: string;
      closeOnEsc: boolean;
      closeOnOutside: boolean;
      showCloseButton: boolean;
      body: {
        type: string;
        wrapWithPanel: boolean;
        wrapperComponent: string;
        resetAfterSubmit: boolean;
        autoFocus: boolean;
        preventEnterSubmit: boolean;
        horizontal: {
          justify: boolean;
          left: number;
          right: number;
        };
        body: any[];
      }[];
    };
  };
  dragRef(ref: any): void;
  initDragging(): void;
  destroyDragging(): void;
  renderHeader(): React.JSX.Element;
  renderOption(
    props: TimelineItem & {
      index: number;
    }
  ): React.JSX.Element;
  renderApiPanel(): any;
  render(): React.JSX.Element;
}
export declare class TimelineItemControlRenderer extends React.Component<TimelineItemProps> {
  render(): React.JSX.Element;
}
export {};
