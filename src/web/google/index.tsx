import React, { createContext, useContext, useEffect, useState } from 'react';
import loadScript from './load-script';
import removeScript from './remove-script';

const AuthContext = createContext<typeof gapi.auth2>(null);
export function GapiAuth({ clientId, ...other }: { clientId: string }) {
  const [auth2, setAuth2] = useState();

  useEffect(() => {
    let mounted = false;
    loadScript(
      document,
      'script',
      'google-login',
      'https://apis.google.com/js/api.js',
      () => {
        const params = {
          client_id: clientId
        }
        window.gapi.load('auth2', () => {
          const GoogleAuth = window.gapi.auth2.getAuthInstance();
          setAuth2(GoogleAuth)
          if (!GoogleAuth) {
            window.gapi.auth2.init(params).then(res => {
              if (!mounted) {
                console.log('init', res);
              } // setAuth2(res)

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
      removeScript(document, 'google-login')
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
    if (auth2) {
      const options = {
        prompt
      }

      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn(options).then(
        res => console.log(res),
        err => console.log(err)
      )
    }
  }

  if (auth2 === undefined) return console.log('Loading')
  if (auth2 === null) return console.log('error while signing in')
  if (auth2) return signIn
}

export function useGapiAuthLogout() {
  const auth2 = useContext(AuthContext);
  const signOut = () => {
    if (auth2) {
      if (auth2 != null) {
        const GoogleAuth = window.gapi.auth2.getAuthInstance();

        GoogleAuth.then(
          () => {
            GoogleAuth.signOut().then(() => {
              GoogleAuth.disconnect()
            })
          },
          err => console.log(err)
        )
      }
    }
  }

  if (auth2 === undefined) return console.log('Loading')
  if (auth2 === null) return console.log('error while signing out')
  if (auth2) return signOut
}

export function useGapiAuthUser() {
  const auth2 = useContext(AuthContext);

  if (auth2 === undefined) return console.log('Loading')
  if (auth2 === null) return console.log('error while signing out')
  if (auth2) return auth2.currentUser.get()
}

