import React, { useContext, useState, useRef } from 'react';

import axios from 'axios';

import { Stages } from '../Context/StagesConfig';
import ButtonTypes from '../Helpers/ButtonTypes';
import CustomButtons from './CustomButtons';
import { API_URL } from '../Helpers/types';

import styles from '../styles/FaceShot.module.css';
import MugShotStage from '../Helpers/MugShotStage';
import ConfirmationDialog from './ConfirmationDialog';
import { useAppContext } from '../Context/DataProvider';
import LoadingComponent from './LoadingComponent';

const FaceShot = () => {
  const value = useAppContext();
  const address = value.state.address;

  const videoRef = useRef(null);
  const [imgurl, setImgurl] = useState('/face-detection.png');
  const [action, setAction] = useState('start');
  const [stage, setStage] = useState(MugShotStage.init);

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const canvasRef = useRef(null);
  // let camera_button = document.querySelector('#start-camera');
  // let video = document.getElementById('video');
  // let click_button = document.querySelector('#click-photo');
  // let canvas = document.getElementById('canvas');
  startCam;

  const startCam = async (event) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      setAction('capture');
      setStage(stage + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const clickPhoto = async (event) => {
    canvas
      .getContext('2d')
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');

    setAction('save');
    setStage(MugShotStage.save);

    console.log(stage);

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

  const submitFaceShot = async (e) => {
    // e.preventDefault();
    setIsLoading(true);

    console.log('abei');

    const formData = new FormData();

    canvasRef.current.toBlob(async (blob) => {
      formData.append('mugshot', blob, 'image.jpeg');
      try {
        const res = await axios.post(
          API_URL + '/api/kyc/submit/nin/front/slip/' + address,
          formData
        );
        console.log(res.data, 'undefined');
        if (res.data.statusCode === 200) {
          console.log(res.data, 'successsssss');
          setIsLoading(false);

          value.change(Stages.submitted);
          // value.change(Stages.backID);
        } else {
          console.log(res.data, 'errrrrorrrrr');
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    });
  };

  const cameraAction = async () => {
    switch (stage) {
      case MugShotStage.init:
        startCam();
        break;
      case MugShotStage.capture:
        clickPhoto();
        break;

      case MugShotStage.save:
        submitFaceShot();
    }
  };

  return (
    <>
      {loading ? (
        <LoadingComponent message={'Processing data'} />
      ) : (
        <div className="container">
          <CustomButtons title={'back'} type={ButtonTypes.back} />
          <div className="kyc-modal">
            <div>
              <h1 className="title"> Take a Selfie</h1>

              <div className={styles.content}>
                <h4 className={styles.description}>
                  Photo must be of good quality
                </h4>
                <p>
                  Please make sure the picture is taken without
                  another person in it{' '}
                </p>
              </div>
            </div>

            <div style={{ width: '100%' }}>
              <video
                className={styles.video}
                width="320"
                height="240"
                ref={videoRef}
                autoPlay
              />

              <div>
                <canvas
                  ref={canvasRef}
                  id="canvas"
                  width="320"
                  height="240"
                ></canvas>
              </div>
            </div>

            <div className={styles.button_group}>
              {stage > MugShotStage.capture && (
                <CustomButtons
                  title={'retry'}
                  type={ButtonTypes.plain}
                  onClick={clickPhoto}
                />
              )}

              <CustomButtons
                title={action}
                type={ButtonTypes.rounded}
                onClick={cameraAction}
              />
            </div>

            {showConfirm && <ConfirmationDialog message={'hello'} />}
          </div>
        </div>
      )}
    </>
  );
};

export default FaceShot;
