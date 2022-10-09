import styles from "../styles/StudentStaticBox.module.css";
import Image from 'next/image'

//Dynamically get student's tutorials

const StudentStaticSubjectBox = ({ icon, heading, subheading, link }) => {
  return (
      <a href={link} className={styles.a}>
      <div className={styles.staticBox}>
      <Image src={icon} alt="subject-icon" width={360} height={170} />
      <div className="d-flex flex-column gap-1">
        <b className={styles.link}>{heading}</b>
        {subheading}
      </div>
    </div>
      </a>
  );
};

export default StudentStaticSubjectBox;

// const StudentStaticSubjectBox = ({ icon, heading, subheading }) => {
//   return (
//     <div className={styles.staticBox}>
//       <Image src={icon} alt="subject-icon" width={360} height={170} />
//       <div className="d-flex flex-column gap-1">
//         <b>{heading}</b>
//         <span>{subheading}</span>
//       </div>
//     </div>
//   );
// };

// export default StudentStaticSubjectBox;
