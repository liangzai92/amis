import React from 'react';
import {
  BaseEventContext,
  BasePlugin,
  BasicToolbarItem,
  PluginEvent,
  PreventClickEventContext,
  RegionConfig,
  VRendererConfig
} from 'amis-editor-core';
export declare class TabsPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    tabs: {
      title: string;
      body: string;
    }[];
  };
  previewSchema: {
    type: string;
    tabs: {
      title: string;
      body: string;
    }[];
  };
  notRenderFormZone: boolean;
  regions: Array<RegionConfig>;
  panelTitle: string;
  events: {
    eventName: string;
    eventLabel: string;
    description: string;
    dataSchema: {
      type: string;
      properties: {
        data: {
          type: string;
          title: string;
          properties: {
            value: {
              type: string;
              title: string;
            };
          };
        };
      };
    }[];
  }[];
  actions: {
    actionType: string;
    actionLabel: string;
    description: string;
    config: string[];
    descDetail: (info: any) => React.JSX.Element;
    schema: {
      items: any[];
      type: string;
      name: string;
      multiple: boolean;
      strictMode: boolean;
    };
  }[];
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  patchContainers: string[];
  vRendererConfig: VRendererConfig;
  wrapperProps: {
    unmountOnExit: boolean;
    mountOnEnter: boolean;
  };
  tabWrapperResolve: (dom: HTMLElement) => HTMLElement;
  overrides: {
    renderTabs(this: any): any;
  };
  /**
   * 补充切换的 toolbar
   * @param context
   * @param toolbars
   */
  buildEditorToolbar(
    context: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  onPreventClick(e: PluginEvent<PreventClickEventContext>): false | undefined;
}
