import React, { Component } from "react";
import styles from './index.less';
import img1 from "@/assets/img1.JPG";
import img2 from "@/assets/img2.JPG";
import img3 from "@/assets/img3.JPG";
import classnames from "classnames";
import * as StackBlur from "stackblur-canvas";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          url: img1,
        },
        {
          url: img2,
        },
        {
          url: img3,
        }
      ]
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <Swiper list={this.state.list} />
      </div>
    );
  }
}

export default Banner;

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      bgShow: false
    };
    this.myList = [];
  }
  componentDidMount() {
    this.myList = this.props.list;
    this.myList.forEach((item, index) => {
      this.getBase64ByUrl(item.url).then(resp => {
        item.base64Url = resp;
        // if (index === 0) {
        //   this._handleChangeIndex(0);
        // }
      });
    });
    // this.interval = setInterval(this._handleChangeIndex, 7000);
  }
  getBase64ByUrl = (src, outputFormat) => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", src, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          var uInt8Array = new Uint8Array(xhr.response);
          var i = uInt8Array.length;
          var binaryString = new Array(i);
          while (i--) {
            binaryString[i] = String.fromCharCode(uInt8Array[i]);
          }
          var data = binaryString.join("");
          var base64 = window.btoa(data);
          var dataUrl = "data:" + (outputFormat || "image/png") + ";base64," + base64;
          resolve(dataUrl);
        }
      };
      xhr.send();
    });
  };

  render() {
    const { list } = this.props;
    const { currentIndex, bgShow } = this.state;
    return (
      <div className={styles.swiper}>
        <div className={styles.swiperContainer}>
          {
            this.myList.map((item, index) => {
              return (
                <div
                  className={classnames(styles.swiperSlide, {
                    [styles.cur]: currentIndex === index
                  })}
                  key={index}
                >
                  <img className={styles.imgBehind} src={item.url} alt="img elements must have an alt props" />
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}