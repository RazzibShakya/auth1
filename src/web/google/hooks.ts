import { useContext } from "react";
import { AuthContext } from './index'

export function useGapiAuthLogin(type: 'facebook' | 'google') {
  const googleAuth = useContext(AuthContext);

  function signIn(e?: Event) {
    if (e) {
      e.preventDefault() 
    }
    if (type === 'google') {
      googleAuth?.getAuthInstance().signIn().then(
        res => console.log(res),
        err => console.log(err)
      )
    }
  }
  return signIn as () => void
}

export function useGapiAuthLogout() {
  const googleAuth = useContext(AuthContext);
  const signOut = () => {
    googleAuth?.getAuthInstance().signOut().then(() => {
      googleAuth?.getAuthInstance().disconnect()
    })
  }
  return signOut as () => void
}

export function useGapiAuthUser() {
  const googleAuth = useContext(AuthContext);
  const userObject = googleAuth?.getAuthInstance().currentUser.get();
  return userObject
}