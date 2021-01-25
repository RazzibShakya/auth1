import React, { createContext, useContext, useEffect, useState } from 'react';
import loadScript from './load-script';
import removeScript from './remove-script';

export const AuthContext = createContext<typeof gapi.auth2 | null>(null);
export function GapiAuth({ clientId, ...other }: { clientId: string }) {
  const [auth2, setAuth2] = useState<typeof gapi.auth2 | null>(null);

  useEffect(() => {
    let mounted = true;
    loadScript(
      document,
      'script',
      'google-login',
      'https://apis.google.com/js/api.js',
      () => {
        const params = {
          client_id: clientId,
          fetch_basic_profile: true,
        }
        window.gapi.load('auth2', () => {
          const GoogleAuth = window.gapi.auth2.getAuthInstance();
          console.log('google auth', GoogleAuth);
          if (!GoogleAuth) {
            window.gapi.auth2.init(params).then(res => {
              if (mounted) {
                setAuth2(window.gapi.auth2)
              }
            },
              err => {
                console.log(err);
              })
          }
        })
      },
      gapiError => {
        console.log(gapiError);
      }
    )
    return () => {
      mounted = false
      removeScript(document, 'google-login')
    }
  }, [])

  return (
    <AuthContext.Provider value={auth2} {...other} />
  );
}








