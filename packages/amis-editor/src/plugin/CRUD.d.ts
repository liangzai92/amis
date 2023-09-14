import React from 'react';
import {
  BasePlugin,
  BasicRendererInfo,
  BasicSubRenderInfo,
  ChangeEventContext,
  PluginEvent,
  RendererEventContext,
  RendererInfoResolveEventContext,
  ScaffoldForm,
  SubRendererInfo
} from 'amis-editor-core';
import type {CRUDCommonSchema} from 'amis';
import type {
  EditorNodeType,
  RendererPluginAction,
  RendererPluginEvent
} from 'amis-editor-core';
type CRUDModes = CRUDCommonSchema['mode'];
export declare class CRUDPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  order: number;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: any;
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  btnSchemas: {
    create: {
      label: string;
      type: string;
      actionType: string;
      level: string;
      dialog: {
        title: string;
        body: {
          type: string;
          api: string;
          body: never[];
        };
      };
    };
    update: {
      label: string;
      type: string;
      actionType: string;
      level: string;
      dialog: {
        title: string;
        body: {
          type: string;
          api: string;
          body: never[];
        };
      };
    };
    view: {
      label: string;
      type: string;
      actionType: string;
      level: string;
      dialog: {
        title: string;
        body: {
          type: string;
          api: string;
          body: never[];
        };
      };
    };
    delete: {
      type: string;
      label: string;
      actionType: string;
      level: string;
      className: string;
      confirmText: string;
      api: string;
    };
    bulkDelete: {
      type: string;
      level: string;
      label: string;
      actionType: string;
      confirmText: string;
      api: string;
    };
    bulkUpdate: {
      type: string;
      label: string;
      actionType: string;
      dialog: {
        title: string;
        size: string;
        body: {
          type: string;
          api: string;
          body: {
            label: string;
            text: string;
            type: string;
          }[];
        };
      };
    };
    filter: {
      title: string;
      body: {
        type: string;
        name: string;
        label: string;
      }[];
    };
  };
  get scaffoldForm(): ScaffoldForm;
  addItem(source: any, target: any): void;
  multifactor: boolean;
  previewSchema: any;
  oldFilter?: any;
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any;
  handleBulkActionEdit(id: string, index: number): void;
  handleItemActionEdit(id: string, index: number): void;
  wrapperProps: {
    affixHeader: boolean;
  };
  /**
   * 默认什么组件都加入的子组件里面，子类里面可以复写这个改变行为。
   * @param context
   * @param renderers
   */
  buildSubRenderers(
    context: RendererEventContext,
    renderers: Array<SubRendererInfo>
  ): BasicSubRenderInfo | Array<BasicSubRenderInfo> | void;
  getRendererInfo(
    context: RendererInfoResolveEventContext
  ): BasicRendererInfo | void;
  renderEditableComponents(props: any): React.JSX.Element | null;
  renderRenderer(props: any): React.JSX.Element;
  filterProps(props: any): any;
  afterUpdate(event: PluginEvent<ChangeEventContext>): void;
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType,
    parent?: EditorNodeType
  ): Promise<any>;
  rendererBeforeDispatchEvent(node: EditorNodeType, e: any, data: any): void;
  /** crud 不同 mode 之间转换时候，主体的转换 */
  transformByMode({
    from,
    to,
    schema
  }: {
    from: CRUDModes;
    to: CRUDModes;
    schema: any;
  }):
    | any[]
    | {
        type: string;
        header: {
          title: string;
          subTitle: string;
        };
        body: any[];
        actions: any[];
      }
    | {
        body: any[];
        actions: any[];
        type?: undefined;
        header?: undefined;
      };
}
export {};
