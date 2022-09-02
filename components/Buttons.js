import Button from 'react-bootstrap/Button';
import signOut from "next-auth/react";

export const SignOutButton = () => {
    return (<Button onClick={() => signOut()}>Sign out.</Button>)
}
