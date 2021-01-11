import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { Button } from '../../components';

export const Home = () => {
  const { addToast } = useToasts();

  const handleClickToast = () => {
    addToast('success', { appearance: 'success' });
    addToast('error', { appearance: 'error' });
    addToast('warning', { appearance: 'warning' });
    addToast('info', { appearance: 'info' });
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleClickToast}>Show toasts</Button>
    </div>
  );
}
