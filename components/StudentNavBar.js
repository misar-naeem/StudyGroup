import styles from "../styles/StudentNavBar.module.css";
import Image from "next/image";
import { signOut, } from "next-auth/react";
import { Button } from "react-bootstrap";
const StudentNavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <a href="/student-profile"><Image src="/../public/icons/lightProfileIcon.png" width={200} height={200} /></a>
        <a href="#news"><Image src="/../public/icons/lightStudyIcon.png" width={350} height={350} /></a>
        <a href="student-dashboard"><Image src="/../public/icons/lightSubjectIcon.png" width={200} height={200} /></a>
      </div>
      <Button onClick={() => signOut()} variant="danger" style={{ backgroundColor: "#FF595E", width: "250px", float: "right" }} className="m-3">
        Log out
      </Button>{" "}</>
  );
};

export default StudentNavBar;
