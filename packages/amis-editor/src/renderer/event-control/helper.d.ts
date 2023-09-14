import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
import {ActionConfig, ComponentInfo} from './types';
import CmptActionSelect from './comp-action-select';
import {ActionData} from '.';
export declare const getArgsWrapper: (
  items: any,
  multiple?: boolean,
  patch?: {}
) => {
  items: any[];
  type: string;
  name: string;
  multiple: boolean;
  strictMode: boolean;
};
export declare const DATA_CONTAINER: string[];
export declare const SELECT_PROPS_CONTAINER: string[];
export declare const IS_DATA_CONTAINER: string;
export declare const SHOW_SELECT_PROP: string;
export declare const FORMITEM_CMPTS: string[];
export declare const SUPPORT_STATIC_FORMITEM_CMPTS: string[];
export declare const SUPPORT_DISABLED_CMPTS: string[];
export declare const ACTION_TYPE_TREE: (manager: any) => RendererPluginAction[];
export declare const renderCmptSelect: (
  componentLabel: string,
  required: boolean,
  onChange?:
    | ((value: string, oldVal: any, data: any, form: any) => void)
    | undefined
) => {
  type: string;
  name: string;
  label: string;
  showIcon: boolean;
  searchable: boolean;
  required: boolean;
  selfDisabledAffectChildren: boolean;
  size: string;
  source: string;
  mode: string;
  autoFill: {
    __rendererLabel: string;
    __rendererName: string;
    __nodeId: string;
    __nodeSchema: string;
    __isScopeContainer: string;
  };
  onChange: (value: string, oldVal: any, data: any, form: any) => Promise<void>;
}[];
export declare const renderCmptActionSelect: (
  componentLabel: string,
  required: boolean,
  onChange?:
    | ((value: string, oldVal: any, data: any, form: any) => void)
    | undefined
) => (
  | {
      type: string;
      name: string;
      label: string;
      showIcon: boolean;
      searchable: boolean;
      required: boolean;
      selfDisabledAffectChildren: boolean;
      size: string;
      source: string;
      mode: string;
      autoFill: {
        __rendererLabel: string;
        __rendererName: string;
        __nodeId: string;
        __nodeSchema: string;
        __isScopeContainer: string;
      };
      onChange: (
        value: string,
        oldVal: any,
        data: any,
        form: any
      ) => Promise<void>;
    }
  | {
      asFormItem: boolean;
      label: string;
      name: string;
      mode: string;
      required: boolean;
      visibleOn: string;
      component: typeof CmptActionSelect;
      description: string;
    }
)[];
export declare const COMMON_ACTION_SCHEMA_MAP: {
  [propName: string]: RendererPluginAction;
};
export declare const findActionNode: (
  actions: RendererPluginAction[],
  actionType: string
) => any;
export declare const findSubActionNode: (
  actions: RendererPluginAction[],
  actionType: string
) => any;
export declare const getActionType: (
  action: ActionConfig,
  hasSubActionNode: RendererPluginAction | null
) => any;
export declare const getEventLabel: (
  events: RendererPluginEvent[],
  name: string
) => any;
export declare const getEventDesc: (
  events: RendererPluginEvent[],
  name: string
) => any;
export declare const getEventStrongDesc: (
  events: RendererPluginEvent[],
  name: string
) => any;
export declare const hasActionType: (
  actionType: string,
  actions?: RendererPluginAction[]
) => boolean;
export declare const getPropOfAcion: (
  action: ActionConfig,
  propName: string,
  actionTree: RendererPluginAction[],
  pluginActions: PluginActions,
  commonActions?:
    | {
        [propName: string]: RendererPluginAction;
      }
    | undefined,
  allComponents?: ComponentInfo[]
) => any;
export declare const getOldActionSchema: (
  manager: EditorManager,
  context: BaseEventContext
) => {
  type: string;
  className: string;
  content: string;
  inline: boolean;
  tooltipTheme: string;
  placement: string;
  body: {
    type: string;
    label: string;
    className: string;
    actionType: string;
    dialog: {
      type: string;
      title: string;
      body: {
        type: string;
        body: any[];
      };
      onConfirm: (values: any[]) => void;
    };
  }[];
};
/**
 * 获取事件动作面板所需属性配置
 */
export declare const getEventControlConfig: (
  manager: EditorManager,
  context: BaseEventContext
) => {
  showOldEntry: boolean;
  actions: any;
  events: any;
  actionTree: any;
  commonActions: any;
  owner: string;
  addBroadcast: any;
  removeBroadcast: any;
  allComponents: any;
  getContextSchemas: (id?: string, withoutSuper?: boolean) => Promise<any>;
  getComponents: (action: RendererPluginAction) => any;
  actionConfigInitFormatter: (action: ActionConfig) => Promise<{
    actionType: any;
    args: any;
  }>;
  actionConfigSubmitFormatter: (
    config: ActionConfig,
    type?: string,
    actionData?: ActionData
  ) => ActionConfig;
};
