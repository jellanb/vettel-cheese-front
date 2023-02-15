import {AppRouter} from "./router/AppRouter";
import AuthProvider from "./auth/context/AuthProvider";
import React from 'react';

function App() {
  return (
      <AuthProvider>
          <AppRouter/>
      </AuthProvider>
  );
};

export default App;
