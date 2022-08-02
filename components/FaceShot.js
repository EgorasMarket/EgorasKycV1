import React, { useContext, useState, useRef } from 'react';

import axios from 'axios';

import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';
import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';
import Image from 'next/image';
import { API_URL } from '../Helpers/types';

const FaceShot = () => {
  const value = useContext(AppContext);
  const videoRef = useRef(null);
  const [imgurl, setImgurl] = useState('/face-detection.png');

  let camera_button = document.querySelector('#start-camera');
  let video = document.getElementById('video');
  let click_button = document.querySelector('#click-photo');
  let canvas = document.getElementById('canvas');
  startCam;

  const startCam = async (event) => {
    // let stream = await navigator.mediaDevices.getUserMedia({
    //   video: true,
    //   audio: false,
    // });
    // video.srcObject = stream;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };

  const clickPhoto = async (event) => {
    canvas
      .getContext('2d')
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    // data url of the image
    console.log(image_data_url);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const types = ['jpg', 'png', 'jpeg'];

      if (event.currentTarget.id === 'backImg') {
        if (event.currentTarget.files.length === 0) {
          // setUserInfo({ ...userInfo, applicantImg: "" });
          // document.getElementById("output1").src = "";
        } else {
          let productFile =
            document.getElementById('backImg').files[0];

          let fileExtension = productFile.name.split('.').pop();
          console.log(productFile);

          if (!types.includes(fileExtension)) {
          } else {
            //console.log(productFile.size);
            if (productFile.size > 1000000) {
              //console.log("file too large.");
            } else {
              setImgurl(URL.createObjectURL(event.target.files[0]));
            }
          }
        }
      }
    }
  };

  const submitFrontImg = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    let checkImg1 = document.getElementById('backImg').files.length;

    if (checkImg1 == 1) {
      console.log('okkkk');
      const element = document.getElementById('backImg');
      const file = element.files[0];
      formData.append('backImg', file);
      //console.log(formData, "hhhh");
      try {
        const res = await axios.post(
          API_URL +
            '/api/kyc/submit/nin/front/slip/0x5dc86878f19E45dE95180E303B8Ff00792D4C4c8',
          formData
        );
        console.log(res.data, 'undefined');
        if (res.data.statusCode === 200) {
          console.log(res.data, 'successsssss');
          value.change(Stages.backID);
        } else {
          console.log(res.data, 'errrrrorrrrr');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('empty Product image');
    }
  };

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div>
          <h1 className="title"> Take a Selfie</h1>
          <h4>Photo must be of good quality</h4>
        </div>

        <div>
          {/* <video id="video" width="320" height="240" autoplay></video> */}
          <video width="320" height="240" ref={videoRef} autoPlay />

          <div>
            <button id="start-camera" onClick={startCam}>
              Start Camera
            </button>
            <button id="click-photo" onClick={clickPhoto}>
              Click Photo
            </button>
          </div>

          <canvas id="canvas" width="320" height="240"></canvas>
        </div>

        <CustomButtons
          title={'choose'}
          type={ButtonTypes.plain}
          onClick={submitFrontImg}
        />
      </div>
    </div>
  );
};

export default FaceShot;
