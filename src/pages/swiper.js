import React, { useState, useEffect } from "react";
import styles from './index.less';
import classnames from "classnames";
import * as StackBlur from "stackblur-canvas";

export default function (props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [myList] = useState(props.list);
    const [myInterval, setMyInterval] = useState(null);

    useEffect(() => {
        initList();
    }, [initList])

    // useEffect(() => {
    //     return () => {
    //         console.log(132);
    //         myInterval && clearInterval(myInterval);
    //     }
    // })

    const initList = () => {
        myList.forEach((item, index) => {
            getBase64ByUrl(item.url).then(resp => {
                item.base64Url = resp;
                if (index === 0) {
                    handleChangeIndex(0);
                }
            });
        });
        console.log("sid");
        let sId = setInterval(handleChangeIndex, 3000);
        setMyInterval(sId);
    }

    const imgLoaded = index => {
        goBlur(document.getElementById("img" + index), document.getElementById("canvas" + index));
    };
    const goBlur = (imgDom, canvasDom) => {
        StackBlur.image(imgDom, canvasDom, 20, true);
        let ch = document.body.clientWidth;
        canvasDom.style.width = "100%";
        if (parseInt(ch) < 1353) {
            canvasDom.style.height = "100%";
        } else {
            canvasDom.style.height = "auto";
        }
    };
    const getBase64ByUrl = (src, outputFormat) => {
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
                    var dataUrl =
                        "data:" + (outputFormat || "image/png") + ";base64," + base64;
                    resolve(dataUrl);
                }
            };
            xhr.send();
        });
    };

    const handleMouse = val => {
        switch (val) {
            case "hover":
                handleClearInterval();
                break;
            case "leave":
                let sId = setInterval(handleChangeIndex, 3000);
                setMyInterval(sId);
                break;
            default:
        }
    };

    const handleChangeIndex = index => {
        console.log("index", index);
        let ci = currentIndex;
        console.log(2, ci);
        ci = index === undefined ? ci + 1 >= myList.length
            ? 0
            : ci + 1
            : index;
        console.log("ci", ci);
        setCurrentIndex(ci);
    };

    const handleClearInterval = () => {
        myInterval && clearInterval(myInterval);
    }

    return (
        <div
            className={styles.swiper}
            onMouseEnter={() => handleMouse("hover")}
            onMouseLeave={() => handleMouse("leave")}
        >
            <div className={styles.swiperContainer}>
                {
                    myList.map((item, index) => {
                        return (
                            <div
                                className={classnames(styles.swiperSlide, {
                                    [styles.cur]: currentIndex === index
                                })}
                                key={index}
                            >
                                <img
                                    className={styles.imgBehind}
                                    src={item.url}
                                    id={"img" + index}
                                    alt="img elements must have an alt props"
                                />
                                <img
                                    className={styles.imgAhead}
                                    src={item.url}
                                    onLoad={() => {
                                        imgLoaded(index);
                                    }}
                                    alt="img elements must have an alt props"
                                />
                                <canvas
                                    id={"canvas" + index}
                                    className={styles.canvasBg}
                                ></canvas>
                            </div>
                        )
                    })
                }
            </div>
            <ul className={styles.switchList}>
                {myList &&
                    myList.length > 1 &&
                    myList.map((item, index) => {
                        return (
                            <li
                                className={classnames({ [styles.cur]: currentIndex === index })}
                                key={index}
                                onClick={() => handleChangeIndex(index)}
                            />
                        );
                    })}
            </ul>
        </div>
    );
}
