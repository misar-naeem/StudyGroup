import navStyles from "../styles/AdminNav.module.css";
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const AdminNav = () => {
  return (
    <nav className={navStyles.nav}>
    <ul>
      <li>
        <Link href='/'>Home</Link>
      </li>
      <li>
        <Link href='/about'>About</Link>
      </li>
    </ul>
  </nav>
  )
}

export default AdminNav