import styles from "../styles/StudentStaticBox.module.css";
import Image from 'next/image'
// import subjectIcon from "../images/subject-icon.jpg";

const StudentStaticSubjectBox = ({ icon, heading, subheading }) => {
  return (
    <div className={styles.staticBox}>
      <Image src={icon} alt="subject-icon" width={360} height={170} />
      <div className="d-flex flex-column gap-1">
        <b>{heading}</b>
        <span>{subheading}</span>
      </div>
    </div>
  );
};

export default StudentStaticSubjectBox;
