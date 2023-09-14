/**
 * @file DSBuilderManager
 * @desc 数据源构造管理器
 */
import {DSBuilderInterface} from './DSBuilder';
import {EditorManager} from 'amis-editor-core';
export declare class DSBuilderManager {
  private builders;
  constructor(manager: EditorManager);
  get size(): number;
  getBuilderByKey(
    key: string
  ): DSBuilderInterface<import('./DSBuilder').DSBuilderBaseOptions> | undefined;
  getBuilderByScaffoldSetting(
    scaffoldConfig: any
  ): DSBuilderInterface<import('./DSBuilder').DSBuilderBaseOptions> | undefined;
  getBuilderBySchema(
    schema: any
  ): DSBuilderInterface<import('./DSBuilder').DSBuilderBaseOptions>;
  getDefaultBuilderKey(): string;
  getDefaultBuilder(): DSBuilderInterface<
    import('./DSBuilder').DSBuilderBaseOptions
  >;
  getAvailableBuilders(): [
    string,
    DSBuilderInterface<import('./DSBuilder').DSBuilderBaseOptions>
  ][];
  getDSSelectorSchema(patch: Record<string, any>): {
    type: string;
    label: string;
    name: string;
    visible: boolean;
    selectFirst: boolean;
    options: {
      label: string;
      value: string;
    }[];
  };
  buildCollectionFromBuilders(
    callback: (
      builder: DSBuilderInterface,
      builderKey: string,
      index: number
    ) => any
  ): any[];
}
