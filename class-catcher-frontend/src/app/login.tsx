// auth.tsx
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="896148448279-2vjdp4e8eofvavf3lr7ej6gk8cokn3mc.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export const GoogleAuthButton: React.FC = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
