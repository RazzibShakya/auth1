# auth
3rd Party Authentication Library

## gapi.auth2

```typescript
  function App() {
  useGoogleAuth({clientId:''})
    return (
    <>
        <UserBar />
        <LoginButton/>
        <LogoutButton/>
    </>
    );
  }
  
  function LoginButton() {
    const login = useGoogleLogin();
    return <button onClick={login}>Login</button>
  }
  
  function LogoutButton() {
    const logout = useAuthLogout();
    return <button onClick={logout}>Logout</button>
  }
  
  function UserBar() {
    const user = useAuthProfile();
    if (!user) return null;
    return user.name;
  }
```
