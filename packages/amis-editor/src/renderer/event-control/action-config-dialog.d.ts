/**
 * 动作配置面板
 */
import {PluginActions, RendererPluginAction} from 'amis-editor-core';
import React from 'react';
import {ActionConfig, ComponentInfo} from './types';
import {PlainObject, SchemaNode} from 'amis-core';
interface ActionDialogProp {
  show: boolean;
  type: string;
  data: any;
  pluginActions: PluginActions;
  actionTree: RendererPluginAction[];
  commonActions?: {
    [propName: string]: RendererPluginAction;
  };
  onSubmit: (type: string, config: any) => void;
  onClose: () => void;
  getComponents: (action: RendererPluginAction) => ComponentInfo[];
  actionConfigInitFormatter?: (actionConfig: ActionConfig) => ActionConfig;
  actionConfigSubmitFormatter?: (
    actionConfig: ActionConfig,
    type?: string
  ) => ActionConfig;
  render: (
    region: string,
    node: SchemaNode,
    props?: PlainObject
  ) => JSX.Element;
}
export default class ActionDialog extends React.Component<ActionDialogProp> {
  /**
   * 获取组件树搜索列表
   * @param tree
   * @param keywords
   * @returns
   */
  getTreeSearchList(tree: RendererPluginAction[], keywords: string): any;
  /**
   * 获取组件树配置schema
   * @param isSearch 是否是搜索
   * @param actionTree 原数据源
   * @param getComponents
   * @returns
   */
  getInputTreeSchema(
    isSearch: boolean,
    actionTree: RendererPluginAction[],
    getComponents: (action: RendererPluginAction) => ComponentInfo[]
  ):
    | {
        source: string;
        highlightTxt: string;
        type: string;
        name: string;
        visibleOn: string;
        disabled: boolean;
        onlyLeaf: boolean;
        showIcon: boolean;
        className: string;
        mode: string;
        labelField: string;
        valueField: string;
        inputClassName: string;
        placeholder: string;
        onChange: (value: string, oldVal: any, data: any, form: any) => void;
      }
    | {
        options: RendererPluginAction[];
        type: string;
        name: string;
        visibleOn: string;
        disabled: boolean;
        onlyLeaf: boolean;
        showIcon: boolean;
        className: string;
        mode: string;
        labelField: string;
        valueField: string;
        inputClassName: string;
        placeholder: string;
        onChange: (value: string, oldVal: any, data: any, form: any) => void;
      };
  render(): JSX.Element;
}
export {};
