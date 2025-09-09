import React from 'react';
import { FloatingActionButtons, Footer, Header } from "./components";
import config from "./secret";
import { AppRouter } from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLocation } from 'react-router-dom';


function App() {

  const location = useLocation();
  const clientId = config.GOOGLE_CLIENT_ID;
  const isPrivatePath =
    location.pathname.includes('manager') ||
    location.pathname.includes('staff') ||
    location.pathname.includes('referee')


  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="flex flex-col min-h-screen">
          {!isPrivatePath && <Header />}
          <div className="flex-grow">
            <AppRouter />
          </div>
          {!isPrivatePath && <Footer />}
        </div>
        {!isPrivatePath && <FloatingActionButtons />}
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
