import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';
import AuthForm from './AuthForm';

const Login = observer(() => {
  const handleLogin = (username, password) => {
    authStore.login(username, password);
  };

  return (
    <div className="auth-page">
      <AuthForm
        isLogin={true}
        onSubmit={handleLogin}
        loading={authStore.isLoading}
        error={authStore.error}
      />
    </div>
  );
});

export default Login;