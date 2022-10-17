import styles from "../styles/StudentNavBar.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const StudentNavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <a href="/student-profile">
          <Image src="/icons/lightProfileIcon.png" width={200} height={200} />
        </a>
        <a href="/student-dashboard">
          <Image src="/icons/lightStudyIcon.png" width={350} height={350} />
        </a>
        <a href="student-dashboard">
          <Image src="/icons/lightSubjectIcon.png" width={200} height={200} />
        </a>
        <a href="/">
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="fa-4x  px-4"
          />
        </a>
      </div>
    </>
  );
};

export default StudentNavBar;
