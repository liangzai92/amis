import React from 'react';
import {BasePlugin, RegionConfig, EditorNodeType} from 'amis-editor-core';
import type {RendererConfig, Schema} from 'amis-core';
import {ModalProps} from 'amis-ui/src/components/Modal';
interface InlineModalProps extends ModalProps {
  type: string;
  children: any;
  dialogType?: string;
  cancelText?: string;
  confirmText?: string;
  cancelBtnLevel?: string;
  confirmBtnLevel?: string;
  editorDialogMountNode?: HTMLDivElement;
}
export declare class DialogPlugin extends BasePlugin {
  static id: string;
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  wrapperProps: {
    wrapperComponent: typeof InlineModal;
    onClose: any;
    show: boolean;
  };
  regions: Array<RegionConfig>;
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
          description: string;
        };
      };
    }[];
  }[];
  actions: {
    actionType: string;
    actionLabel: string;
    description: string;
  }[];
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  buildSubRenderers(): void;
  buildDataSchemas(
    node: EditorNodeType,
    region?: EditorNodeType,
    trigger?: EditorNodeType
  ): Promise<{
    $id: string;
    type: string;
    title: any;
    properties: any;
  }>;
  /**
   * 为了让 dialog 的按钮可以点击编辑
   */
  patchSchema(schema: Schema, info: RendererConfig, props?: any): any;
}
export declare class InlineModal extends React.Component<
  InlineModalProps,
  any
> {
  componentDidMount(): void;
  render(): React.JSX.Element;
}
export {};
