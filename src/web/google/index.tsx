import React, { createContext, useContext, useEffect, useState } from 'react';
import loadScript from './load-script';
// import removeScript from './remove-script';

const AuthContext = createContext<typeof gapi.auth2 | null>(null);
export function GapiAuth({ clientId, ...other }: { clientId: string }) {
  const [auth2, setAuth2] = useState<typeof gapi.auth2 | null>(null);

  useEffect(() => {
    let mounted = false;
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
              if (!mounted) {
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
      mounted = true
      // removeScript(document, 'google-login')
    }
  }, [])

  return (
    <AuthContext.Provider value={auth2} {...other} />
  );
}


export function useGapiAuthLogin() {
  const auth2 = useContext(AuthContext);

  function signIn(e?: any) {
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    auth2?.getAuthInstance().signIn().then(
      res => console.log(res),
      err => console.log(err)
    )
  }
  return signIn as () => void
}

export function useGapiAuthLogout() {
  const auth2 = useContext(AuthContext);
  const signOut = () => {
    auth2?.getAuthInstance().signOut().then(() => {
      auth2?.getAuthInstance().disconnect()
    })
  }
  return signOut as () => void
}

export function useGapiAuthUser() {
  const auth2 = useContext(AuthContext);
  const userObject = auth2?.getAuthInstance().currentUser.get();

  if (userObject === null) return null
  return userObject
}



