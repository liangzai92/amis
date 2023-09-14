import {EditorNodeType} from 'amis-editor-core';
import {
  BasePlugin,
  BasicRendererInfo,
  RendererInfoResolveEventContext
} from 'amis-editor-core';
export declare class List2Plugin extends BasePlugin {
  static id: string;
  static scene: string[];
  rendererName: string;
  $schema: string;
  name: string;
  isBaseComponent: boolean;
  isListComponent: boolean;
  memberImmutable: boolean;
  description: string;
  docLink: string;
  tags: string[];
  icon: string;
  pluginIcon: string;
  scaffold: {
    type: string;
    columnsCount: number;
    card: {
      type: string;
      body: {
        type: string;
        body: {
          type: string;
          items: (
            | {
                type: string;
                body: (
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      style: {
                        color: string;
                        fontSize: string;
                        fontWeight: string;
                        marginRight: string;
                        position?: undefined;
                        display?: undefined;
                        flexWrap?: undefined;
                        flexDirection?: undefined;
                        alignItems?: undefined;
                        justifyContent?: undefined;
                      };
                      id?: undefined;
                      body?: undefined;
                      wrapperBody?: undefined;
                      isFixedHeight?: undefined;
                      isFixedWidth?: undefined;
                    }
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      style: {
                        marginRight: string;
                        fontSize: string;
                        color: string;
                        fontWeight?: undefined;
                        position?: undefined;
                        display?: undefined;
                        flexWrap?: undefined;
                        flexDirection?: undefined;
                        alignItems?: undefined;
                        justifyContent?: undefined;
                      };
                      id: string;
                      body?: undefined;
                      wrapperBody?: undefined;
                      isFixedHeight?: undefined;
                      isFixedWidth?: undefined;
                    }
                  | {
                      type: string;
                      body: {
                        type: string;
                        tpl: string;
                        inline: boolean;
                        wrapperComponent: string;
                        style: {
                          fontSize: string;
                        };
                      }[];
                      style: {
                        position: string;
                        display: string;
                        flexWrap: string;
                        flexDirection: string;
                        alignItems: string;
                        justifyContent: string;
                        color?: undefined;
                        fontSize?: undefined;
                        fontWeight?: undefined;
                        marginRight?: undefined;
                      };
                      wrapperBody: boolean;
                      isFixedHeight: boolean;
                      isFixedWidth: boolean;
                      tpl?: undefined;
                      inline?: undefined;
                      wrapperComponent?: undefined;
                      id?: undefined;
                    }
                )[];
                size: string;
                style: {
                  'position': string;
                  'display': string;
                  'flex': string;
                  'flexGrow': number;
                  'flexBasis': string;
                  'flexWrap': string;
                  'justifyContent': string;
                  'alignItems': string;
                  'paddingLeft': string;
                  'paddingRight': string;
                  'right-border-width': string;
                  'right-border-style': string;
                  'right-border-color': string;
                  'marginRight': string;
                  'flexDirection'?: undefined;
                };
                wrapperBody: boolean;
                isFixedHeight: boolean;
                isFixedWidth: boolean;
                id?: undefined;
              }
            | {
                type: string;
                body: (
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      style: {
                        fontSize: string;
                        color: string;
                        fontWeight: string;
                        marginBottom: string;
                      };
                      maxLine: number;
                      id: string;
                    }
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      maxLine: number;
                      style: {
                        fontSize: string;
                        color: string;
                        fontWeight?: undefined;
                        marginBottom?: undefined;
                      };
                      id?: undefined;
                    }
                )[];
                size: string;
                style: {
                  'position': string;
                  'display': string;
                  'flex': string;
                  'flexGrow': number;
                  'flexBasis': string;
                  'flexWrap': string;
                  'flexDirection': string;
                  'alignItems': string;
                  'justifyContent'?: undefined;
                  'paddingLeft'?: undefined;
                  'paddingRight'?: undefined;
                  'right-border-width'?: undefined;
                  'right-border-style'?: undefined;
                  'right-border-color'?: undefined;
                  'marginRight'?: undefined;
                };
                wrapperBody: boolean;
                isFixedHeight: boolean;
                isFixedWidth: boolean;
                id?: undefined;
              }
            | {
                type: string;
                body: {
                  type: string;
                  label: string;
                  onEvent: {
                    click: {
                      actions: never[];
                    };
                  };
                  level: string;
                  size: string;
                  editorState: string;
                  themeCss: {
                    className: {
                      'border:default': {
                        'top-border-width': string;
                        'left-border-width': string;
                        'right-border-width': string;
                        'bottom-border-width': string;
                        'top-border-style': string;
                        'left-border-style': string;
                        'right-border-style': string;
                        'bottom-border-style': string;
                        'top-border-color': string;
                        'left-border-color': string;
                        'right-border-color': string;
                        'bottom-border-color': string;
                      };
                      'padding-and-margin:default': {
                        paddingLeft: string;
                        paddingRight: string;
                      };
                      'radius:default': {
                        'top-left-border-radius': string;
                        'top-right-border-radius': string;
                        'bottom-left-border-radius': string;
                        'bottom-right-border-radius': string;
                      };
                      'font:default': {
                        color: string;
                      };
                    };
                  };
                }[];
                size: string;
                style: {
                  'position': string;
                  'display': string;
                  'flex': string;
                  'flexGrow': number;
                  'flexBasis': string;
                  'flexWrap': string;
                  'flexDirection': string;
                  'justifyContent': string;
                  'alignItems'?: undefined;
                  'paddingLeft'?: undefined;
                  'paddingRight'?: undefined;
                  'right-border-width'?: undefined;
                  'right-border-style'?: undefined;
                  'right-border-color'?: undefined;
                  'marginRight'?: undefined;
                };
                wrapperBody: boolean;
                isFixedHeight: boolean;
                isFixedWidth: boolean;
                id: string;
              }
          )[];
          style: {
            position: string;
          };
        }[];
        size: string;
        style: {
          'position': string;
          'display': string;
          'overflowY': string;
          'overflowX': string;
          'paddingTop': string;
          'paddingRight': string;
          'paddingBottom': string;
          'paddingLeft': string;
          'radius': {
            'top-left-border-radius': string;
            'top-right-border-radius': string;
            'bottom-left-border-radius': string;
            'bottom-right-border-radius': string;
          };
          'top-border-width': string;
          'left-border-width': string;
          'right-border-width': string;
          'bottom-border-width': string;
          'top-border-style': string;
          'left-border-style': string;
          'right-border-style': string;
          'bottom-border-style': string;
          'top-border-color': string;
          'left-border-color': string;
          'right-border-color': string;
          'bottom-border-color': string;
          'flex': string;
          'marginRight': string;
          'flexBasis': string;
          'boxShadow': string;
        };
        wrapperBody: boolean;
        isFixedHeight: boolean;
        isFixedWidth: boolean;
        onEvent: {
          click: {
            weight: number;
            actions: never[];
          };
        };
      }[];
      style: {
        position: string;
        display: string;
        width: string;
        overflowX: string;
        margin: string;
        flexWrap: string;
        justifyContent: string;
      };
      isFixedHeight: boolean;
      isFixedWidth: boolean;
      wrapperBody: boolean;
    };
    placeholder: string;
    name: string;
    style: {
      gutterY: number;
    };
  };
  previewSchema: {
    className: string;
    type: string;
    columnsCount: number;
    card: {
      type: string;
      body: {
        type: string;
        body: {
          type: string;
          items: (
            | {
                type: string;
                body: (
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      style: {
                        color: string;
                        fontSize: string;
                        fontWeight: string;
                        marginRight: string;
                        position?: undefined;
                        display?: undefined;
                        flexWrap?: undefined;
                        flexDirection?: undefined;
                        alignItems?: undefined;
                        justifyContent?: undefined;
                      };
                      id?: undefined;
                      body?: undefined;
                      wrapperBody?: undefined;
                      isFixedHeight?: undefined;
                      isFixedWidth?: undefined;
                    }
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      style: {
                        marginRight: string;
                        fontSize: string;
                        color: string;
                        fontWeight?: undefined;
                        position?: undefined;
                        display?: undefined;
                        flexWrap?: undefined;
                        flexDirection?: undefined;
                        alignItems?: undefined;
                        justifyContent?: undefined;
                      };
                      id: string;
                      body?: undefined;
                      wrapperBody?: undefined;
                      isFixedHeight?: undefined;
                      isFixedWidth?: undefined;
                    }
                  | {
                      type: string;
                      body: {
                        type: string;
                        tpl: string;
                        inline: boolean;
                        wrapperComponent: string;
                        style: {
                          fontSize: string;
                        };
                      }[];
                      style: {
                        position: string;
                        display: string;
                        flexWrap: string;
                        flexDirection: string;
                        alignItems: string;
                        justifyContent: string;
                        color?: undefined;
                        fontSize?: undefined;
                        fontWeight?: undefined;
                        marginRight?: undefined;
                      };
                      wrapperBody: boolean;
                      isFixedHeight: boolean;
                      isFixedWidth: boolean;
                      tpl?: undefined;
                      inline?: undefined;
                      wrapperComponent?: undefined;
                      id?: undefined;
                    }
                )[];
                size: string;
                style: {
                  'position': string;
                  'display': string;
                  'flex': string;
                  'flexGrow': number;
                  'flexBasis': string;
                  'flexWrap': string;
                  'justifyContent': string;
                  'alignItems': string;
                  'paddingLeft': string;
                  'paddingRight': string;
                  'right-border-width': string;
                  'right-border-style': string;
                  'right-border-color': string;
                  'marginRight': string;
                  'flexDirection'?: undefined;
                };
                wrapperBody: boolean;
                isFixedHeight: boolean;
                isFixedWidth: boolean;
                id?: undefined;
              }
            | {
                type: string;
                body: (
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      style: {
                        fontSize: string;
                        color: string;
                        fontWeight: string;
                        marginBottom: string;
                      };
                      maxLine: number;
                      id: string;
                    }
                  | {
                      type: string;
                      tpl: string;
                      inline: boolean;
                      wrapperComponent: string;
                      maxLine: number;
                      style: {
                        fontSize: string;
                        color: string;
                        fontWeight?: undefined;
                        marginBottom?: undefined;
                      };
                      id?: undefined;
                    }
                )[];
                size: string;
                style: {
                  'position': string;
                  'display': string;
                  'flex': string;
                  'flexGrow': number;
                  'flexBasis': string;
                  'flexWrap': string;
                  'flexDirection': string;
                  'alignItems': string;
                  'justifyContent'?: undefined;
                  'paddingLeft'?: undefined;
                  'paddingRight'?: undefined;
                  'right-border-width'?: undefined;
                  'right-border-style'?: undefined;
                  'right-border-color'?: undefined;
                  'marginRight'?: undefined;
                };
                wrapperBody: boolean;
                isFixedHeight: boolean;
                isFixedWidth: boolean;
                id?: undefined;
              }
            | {
                type: string;
                body: {
                  type: string;
                  label: string;
                  onEvent: {
                    click: {
                      actions: never[];
                    };
                  };
                  level: string;
                  size: string;
                  editorState: string;
                  themeCss: {
                    className: {
                      'border:default': {
                        'top-border-width': string;
                        'left-border-width': string;
                        'right-border-width': string;
                        'bottom-border-width': string;
                        'top-border-style': string;
                        'left-border-style': string;
                        'right-border-style': string;
                        'bottom-border-style': string;
                        'top-border-color': string;
                        'left-border-color': string;
                        'right-border-color': string;
                        'bottom-border-color': string;
                      };
                      'padding-and-margin:default': {
                        paddingLeft: string;
                        paddingRight: string;
                      };
                      'radius:default': {
                        'top-left-border-radius': string;
                        'top-right-border-radius': string;
                        'bottom-left-border-radius': string;
                        'bottom-right-border-radius': string;
                      };
                      'font:default': {
                        color: string;
                      };
                    };
                  };
                }[];
                size: string;
                style: {
                  'position': string;
                  'display': string;
                  'flex': string;
                  'flexGrow': number;
                  'flexBasis': string;
                  'flexWrap': string;
                  'flexDirection': string;
                  'justifyContent': string;
                  'alignItems'?: undefined;
                  'paddingLeft'?: undefined;
                  'paddingRight'?: undefined;
                  'right-border-width'?: undefined;
                  'right-border-style'?: undefined;
                  'right-border-color'?: undefined;
                  'marginRight'?: undefined;
                };
                wrapperBody: boolean;
                isFixedHeight: boolean;
                isFixedWidth: boolean;
                id: string;
              }
          )[];
          style: {
            position: string;
          };
        }[];
        size: string;
        style: {
          'position': string;
          'display': string;
          'overflowY': string;
          'overflowX': string;
          'paddingTop': string;
          'paddingRight': string;
          'paddingBottom': string;
          'paddingLeft': string;
          'radius': {
            'top-left-border-radius': string;
            'top-right-border-radius': string;
            'bottom-left-border-radius': string;
            'bottom-right-border-radius': string;
          };
          'top-border-width': string;
          'left-border-width': string;
          'right-border-width': string;
          'bottom-border-width': string;
          'top-border-style': string;
          'left-border-style': string;
          'right-border-style': string;
          'bottom-border-style': string;
          'top-border-color': string;
          'left-border-color': string;
          'right-border-color': string;
          'bottom-border-color': string;
          'flex': string;
          'marginRight': string;
          'flexBasis': string;
          'boxShadow': string;
        };
        wrapperBody: boolean;
        isFixedHeight: boolean;
        isFixedWidth: boolean;
        onEvent: {
          click: {
            weight: number;
            actions: never[];
          };
        };
      }[];
      style: {
        position: string;
        display: string;
        width: string;
        overflowX: string;
        margin: string;
        flexWrap: string;
        justifyContent: string;
      };
      isFixedHeight: boolean;
      isFixedWidth: boolean;
      wrapperBody: boolean;
    };
    placeholder: string;
    name: string;
    style: {
      gutterY: number;
    };
  };
  panelTitle: string;
  panelJustify: boolean;
  panelBodyCreator: (context: BaseEventContext) => any[];
  buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
  filterProps(props: any): any;
  getRendererInfo(
    context: RendererInfoResolveEventContext
  ): BasicRendererInfo | void;
}
