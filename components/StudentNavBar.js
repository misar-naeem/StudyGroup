import styles from "../styles/StudentNavBar.module.css";
import Image from "next/image";
const StudentNavBar = () => {
  return (
    <div class={styles.navbar}>
      <a href="/student-profile"><Image src="/../public/icons/lightProfileIcon.png" width={200} height={200}/></a>
      <a href="#news"><Image src="/../public/icons/lightStudyIcon.png" width={350} height={350}/></a>
      <a href="student-dashboard"><Image src="/../public/icons/lightSubjectIcon.png" width={200} height={200}/></a>
    </div>
  );
};

export default StudentNavBar;
