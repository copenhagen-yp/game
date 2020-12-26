declare module '*.pcss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNamesTypes: IClassNames;
  export = classNamesTypes;
}
