declare module '*.pcss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNamesTypes: IClassNames;
  export = classNamesTypes;
}

declare module 'isomorphic-style-loader/StyleContext';
declare module 'isomorphic-style-loader/withStyles';
