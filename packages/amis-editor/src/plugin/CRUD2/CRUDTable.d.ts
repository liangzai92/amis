/**
 * @file CRUDTable.tsx
 * @desc 表格模式的 CRUD2
 */
import {EditorManager} from 'amis-editor-core';
import {BaseCRUDPlugin} from './BaseCRUD';
export declare class CRUDTablePlugin extends BaseCRUDPlugin {
  static id: string;
  panelJustify: boolean;
  multifactor: boolean;
  isBaseComponent: boolean;
  description: string;
  order: number;
  $schema: string;
  docLink: string;
  previewSchema: Record<string, any>;
  scaffold: any;
  constructor(manager: EditorManager);
  /** 非实体数据源走默认构建 */
  panelBodyCreator: (context: BuildPanelEventContext) => any;
}
