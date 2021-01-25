# auth
3rd Party Authentication Library

## gapi.auth2

```typescript
  function App() {
    return (
      <GapiAuth clientId="">
        <UserBar />
      </GapiAuth>
    );
  }
  
  function LoginButton() {
    const login = useGapiAuthLogin();
    return <button onClick={login}>Login</button>
  }
  
  function LogoutButton() {
    const logout = useGapiAuthLogout();
    return <button onClick={logout}>Logout</button>
  }
  
  function UserBar() {
    const user = useGapiAuthUser();
    if (!user) return null;
    return user.name;
  }
```
