import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';
import AuthForm from './AuthForm';

const Register = observer(() => {
  const handleRegister = (email, username, password) => {
    authStore.register(email, username, password);
  };

  return (
    <div className="auth-page">
      <AuthForm
        isLogin={false}
        onSubmit={handleRegister}
        loading={authStore.isLoading}
        error={authStore.error}
      />
    </div>
  );
});

export default Register;