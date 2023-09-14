import {EditorNodeType} from 'amis-editor-core';
import {BasePlugin} from 'amis-editor-core';
export declare class EachPlugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  isListComponent: boolean;
  memberImmutable: boolean;
  description: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    name: string;
    items: {
      type: string;
      body: (
        | {
            type: string;
            body: (
              | {
                  type: string;
                  icon: string;
                  vendor: string;
                  themeCss: {
                    className: {
                      'padding-and-margin:default': {
                        marginRight: string;
                      };
                      'font': {
                        color: string;
                        fontSize: string;
                      };
                    };
                  };
                  style?: undefined;
                  tpl?: undefined;
                  inline?: undefined;
                  wrapperComponent?: undefined;
                }
              | {
                  type: string;
                  style: {
                    fontWeight: string;
                    fontSize: string;
                    color: string;
                  };
                  tpl: string;
                  inline: boolean;
                  wrapperComponent: string;
                  icon?: undefined;
                  vendor?: undefined;
                  themeCss?: undefined;
                }
            )[];
            style: {
              position: string;
              display: string;
              flexWrap: string;
              justifyContent: string;
              alignItems: string;
              marginBottom: string;
            };
            wrapperBody: boolean;
            isFixedHeight: boolean;
            isFixedWidth: boolean;
          }
        | {
            type: string;
            body: {
              type: string;
              tpl: string;
              inline: boolean;
              wrapperComponent: string;
              style: {
                'fontSize': string;
                'color': string;
                'fontWeight': string;
                'font-family': string;
              };
            }[];
            style: {
              position: string;
              display: string;
              flexWrap?: undefined;
              justifyContent?: undefined;
              alignItems?: undefined;
              marginBottom?: undefined;
            };
            wrapperBody: boolean;
            isFixedHeight?: undefined;
            isFixedWidth?: undefined;
          }
      )[];
      size: string;
      style: {
        position: string;
        display: string;
        flex: string;
        marginRight: string;
        paddingTop: string;
        paddingRight: string;
        paddingBottom: string;
        paddingLeft: string;
        flexBasis: string;
        overflowX: string;
        overflowY: string;
        boxShadow: string;
        radius: {
          'top-left-border-radius': string;
          'top-right-border-radius': string;
          'bottom-left-border-radius': string;
          'bottom-right-border-radius': string;
        };
      };
      wrapperBody: boolean;
      isFixedHeight: boolean;
    };
    placeholder: string;
    style: {
      position: string;
      display: string;
      flexWrap: string;
      justifyContent: string;
      alignItems: string;
      marginTop: string;
      marginBottom: string;
    };
    isFixedHeight: boolean;
    isFixedWidth: boolean;
    size: string;
  };
  previewSchema: {
    value: string[];
    type: string;
    name: string;
    items: {
      type: string;
      body: (
        | {
            type: string;
            body: (
              | {
                  type: string;
                  icon: string;
                  vendor: string;
                  themeCss: {
                    className: {
                      'padding-and-margin:default': {
                        marginRight: string;
                      };
                      'font': {
                        color: string;
                        fontSize: string;
                      };
                    };
                  };
                  style?: undefined;
                  tpl?: undefined;
                  inline?: undefined;
                  wrapperComponent?: undefined;
                }
              | {
                  type: string;
                  style: {
                    fontWeight: string;
                    fontSize: string;
                    color: string;
                  };
                  tpl: string;
                  inline: boolean;
                  wrapperComponent: string;
                  icon?: undefined;
                  vendor?: undefined;
                  themeCss?: undefined;
                }
            )[];
            style: {
              position: string;
              display: string;
              flexWrap: string;
              justifyContent: string;
              alignItems: string;
              marginBottom: string;
            };
            wrapperBody: boolean;
            isFixedHeight: boolean;
            isFixedWidth: boolean;
          }
        | {
            type: string;
            body: {
              type: string;
              tpl: string;
              inline: boolean;
              wrapperComponent: string;
              style: {
                'fontSize': string;
                'color': string;
                'fontWeight': string;
                'font-family': string;
              };
            }[];
            style: {
              position: string;
              display: string;
              flexWrap?: undefined;
              justifyContent?: undefined;
              alignItems?: undefined;
              marginBottom?: undefined;
            };
            wrapperBody: boolean;
            isFixedHeight?: undefined;
            isFixedWidth?: undefined;
          }
      )[];
      size: string;
      style: {
        position: string;
        display: string;
        flex: string;
        marginRight: string;
        paddingTop: string;
        paddingRight: string;
        paddingBottom: string;
        paddingLeft: string;
        flexBasis: string;
        overflowX: string;
        overflowY: string;
        boxShadow: string;
        radius: {
          'top-left-border-radius': string;
          'top-right-border-radius': string;
          'bottom-left-border-radius': string;
          'bottom-right-border-radius': string;
        };
      };
      wrapperBody: boolean;
      isFixedHeight: boolean;
    };
    placeholder: string;
    style: {
      position: string;
      display: string;
      flexWrap: string;
      justifyContent: string;
      alignItems: string;
      marginTop: string;
      marginBottom: string;
    };
    isFixedHeight: boolean;
    isFixedWidth: boolean;
    size: string;
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any;
  filterProps(props: any): any;
  buildDataSchemas(node: EditorNodeType, region?: EditorNodeType): any;
}
