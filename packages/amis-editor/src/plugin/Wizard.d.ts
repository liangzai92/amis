import {EditorNodeType} from 'amis-editor-core';
import {
  BaseEventContext,
  BasePlugin,
  BasicToolbarItem,
  VRendererConfig
} from 'amis-editor-core';
import {RendererPluginAction, RendererPluginEvent} from 'amis-editor-core';
export declare class WizardPlugin extends BasePlugin {
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
    steps: {
      title: string;
      body: {
        type: string;
        label: string;
        name: string;
      }[];
    }[];
  };
  previewSchema: {
    type: string;
    className: string;
    steps: {
      title: string;
      body: {
        type: string;
        label: string;
        name: string;
      }[];
    }[];
  };
  events: RendererPluginEvent[];
  actions: RendererPluginAction[];
  panelTitle: string;
  panelBodyCreator: (context: BaseEventContext) => any[];
  /**
   * 补充切换的 toolbar
   * @param context
   * @param toolbars
   */
  buildEditorToolbar(
    context: BaseEventContext,
    toolbars: Array<BasicToolbarItem>
  ): void;
  filterProps(props: any): any;
  patchContainers: string[];
  vRendererConfig: VRendererConfig;
  wizardWrapperResolve: (dom: HTMLElement) => any;
  overrides: {
    renderWizard: (this: any) => any;
    renderFooter: (this: any) => any;
  };
  rendererBeforeDispatchEvent(node: EditorNodeType, e: any, data: any): void;
}
