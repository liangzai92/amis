/**
 * @file 进行详细配置
 */
import React from 'react';
import {EditorManager} from 'amis-editor-core';
import {FormControlProps} from 'amis-core';
export interface GoCongigControlProps extends FormControlProps {
  label: string;
  compId: string | ((data: any) => string);
  manager: EditorManager;
}
export declare class GoConfigControl extends React.PureComponent<
  GoCongigControlProps,
  any
> {
  onClick(): void;
  render(): React.JSX.Element;
}
export declare class GoConfigControlRenderer extends GoConfigControl {}
