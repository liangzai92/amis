import {ListenerAction} from 'amis-core';
import {RendererPluginAction} from 'amis-editor-core';
export interface ActionConfig extends ListenerAction {
  [propName: string]: any;
}
export interface ActionEventConfig {
  [propName: string]: {
    weight?: number;
    actions: ActionConfig[];
    __isBroadcast?: boolean;
    debounce?: {
      wait: number;
    };
  };
}
export interface ComponentInfo {
  label: string;
  value: string;
  type: string;
  disabled?: boolean;
  actions?: RendererPluginAction[];
  children?: ComponentInfo[];
  id: string;
}
export interface ContextVariables {
  label: string;
  value?: any;
  tag?: string | string[];
  children?: any[];
  path?: string;
}
