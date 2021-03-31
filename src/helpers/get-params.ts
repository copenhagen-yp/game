export const getParamByKey = (key: string) => {
  const param = window.location.search.match(new RegExp(key + '=([^&=]+)'));

  return param ? param[1] : '';
};
