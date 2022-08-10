import * as React from "react";

import Slide from "@mui/material/Slide";

import { useAppContext } from "../Context/DataProvider";
import styles from "../styles/Submitted.module.css";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Submitted({}) {
  const defaultImage = "/vercel.svg";
  const [imgurl, setImgurl] = React.useState(defaultImage);
  const value = useAppContext();

  return (
    <div className={styles.container}>
      <Image src={imgurl} alt="" width={200} height={100} />

      <h2 className={styles.header_text}>
        Thank you for submitting your account information.{" "}
      </h2>
      <p>
        Our onboarding team will review your details and activate your account
        shortly
      </p>

      <span> Note: This may take between 2 to 5 working days</span>
    </div>
  );
}
