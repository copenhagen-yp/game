import { useHttp } from './useHttp';
import { generateOauthLink, oauthApi } from '../api/oauth';

export const useOauthButton = () => {
  const { request: getServiceIdRequest } = useHttp();
  const { getServiceId } = oauthApi(getServiceIdRequest);

  const handleOauthClick = () => {
    getServiceId()
      .then(({ service_id }) => {
        document.location.href = generateOauthLink(service_id);
      });
  };

  return {
    handleOauthClick,
  };
};
