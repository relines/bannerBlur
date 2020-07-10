import React, { useState } from "react";
import styles from './index.less';
import img1 from "@/assets/img1.JPG";
import img2 from "@/assets/img2.JPG";
import img3 from "@/assets/img3.JPG";
import Swiper from "./swiper";

export default function (props) {
  const [list] = useState([
    {
      url: img1,
    },
    {
      url: img2,
    },
    {
      url: img3,
    }
  ]);
  return (
    <div className={styles.container}>
      <Swiper list={list} />
    </div>
  );
}