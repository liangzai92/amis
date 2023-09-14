import React from 'react';
import Sortable from 'sortablejs';
import {DataSchema} from 'amis';
import {FormControlProps} from 'amis-core';
import {
  ActionConfig,
  ActionEventConfig,
  ComponentInfo,
  ContextVariables
} from './types';
import {
  EditorManager,
  PluginActions,
  PluginEvents,
  RendererPluginAction,
  RendererPluginEvent,
  SubRendererPluginAction
} from 'amis-editor-core';
export * from './helper';
interface EventControlProps extends FormControlProps {
  actions: PluginActions;
  events: PluginEvents;
  actionTree: RendererPluginAction[];
  commonActions?: {
    [propName: string]: RendererPluginAction;
  };
  value: ActionEventConfig;
  onChange: (
    value: any,
    submitOnChange?: boolean,
    changeImmediately?: boolean
  ) => void;
  addBroadcast?: (event: RendererPluginEvent) => void;
  removeBroadcast?: (eventName: string) => void;
  getComponents: (action: any) => ComponentInfo[];
  getContextSchemas?: (id?: string, withoutSuper?: boolean) => DataSchema;
  actionConfigInitFormatter?: (actionConfig: ActionConfig) => ActionConfig;
  actionConfigSubmitFormatter?: (
    actionConfig: ActionConfig,
    type?: string,
    actionData?: ActionData
  ) => ActionConfig;
  owner?: string;
}
interface EventDialogData {
  eventName: string;
  eventLabel: string;
  isBroadcast: boolean;
  debounceConfig?: {
    open: boolean;
    wait?: number;
  };
  [propName: string]: any;
}
export interface ActionData {
  eventKey: string;
  actionIndex?: number;
  action?: ActionConfig;
  variables?: ContextVariables[];
  pluginActions: PluginActions;
  getContextSchemas?: (id?: string, withoutSuper?: boolean) => DataSchema;
  groupType?: string;
  __actionDesc?: string;
  __cmptTreeSource?: ComponentInfo[];
  __superCmptTreeSource?: ComponentInfo[];
  __actionSchema?: any;
  __subActions?: SubRendererPluginAction[];
  __setValueDs?: any[];
  [propName: string]: any;
}
interface EventControlState {
  onEvent: ActionEventConfig;
  events: RendererPluginEvent[];
  eventPanelActive: {
    [prop: string]: boolean;
  };
  showAcionDialog: boolean;
  showEventDialog: boolean;
  eventDialogData?: EventDialogData;
  actionData: ActionData | undefined;
  type: 'update' | 'add';
  appLocaleState?: number;
}
export declare class EventControl extends React.Component<
  EventControlProps,
  EventControlState
> {
  target: HTMLElement | null;
  eventPanelSortMap: {
    [prop: string]: Sortable;
  };
  drag?: HTMLElement | null;
  unReaction: any;
  constructor(props: EventControlProps);
  componentDidMount(): void;
  componentWillUnmount(): void;
  componentDidUpdate(
    prevProps: EventControlProps,
    prevState: EventControlState
  ): void;
  generateEmptyDefault(events: RendererPluginEvent[]): ActionEventConfig;
  addEvent(event: RendererPluginEvent, disabled: boolean): void;
  activeEventDialog(eventInfo: EventDialogData): void;
  eventDialogSubmit(formData: any): void;
  delEvent(event: string): void;
  addAction(event: string, config: any): void;
  updateAction(event: string, index: number, config: any): void;
  delAction(event: string, action: any, index: number): void;
  toggleActivePanel(eventKey: string): void;
  updateWeight(event: string, data: any): void;
  /**
   * 更新事件配置
   *
   * @param {string} event
   * @param {number} actionIndex
   * @param {*} config
   * @memberof EventControl
   */
  updateValue(event: string, index: number, config: any): Promise<void>;
  dragRef(ref: any): void;
  initDragging(): void;
  genSortPanel(eventKey: string, ele: HTMLElement): Sortable;
  destroyDragging(): void;
  buildEventDataSchema(data: any, manager: EditorManager): void;
  buildContextSchema(data: any): Promise<any>;
  activeActionDialog(
    data: Pick<EventControlState, 'showAcionDialog' | 'type' | 'actionData'>
  ): Promise<void>;
  renderDesc(action: ActionConfig): React.JSX.Element | null;
  getRefsFromCurrentDialog(definitions: any, action: any): string;
  onSubmit(type: string, config: any): void;
  onClose(): void;
  removeDataSchema(): void;
  render(): React.JSX.Element;
}
export declare class EventControlRenderer extends EventControl {}
