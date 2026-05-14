import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthProvider';

export function LogoutPage(): null {
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    logout();
    history.replace('/');
  }, [logout, history]);

  return null;
}
