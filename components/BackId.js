import React, { useContext, useState } from 'react';

import axios from 'axios';

import AppContext from '../Context/AppContext';
import { Stages } from '../Context/StagesConfig';
import ButtonTypes from '../Helpers/ButtonTypes';
import validateNIN from '../Helpers/validations/ValidateNIN';
import CustomButtons from './CustomButtons';
import TextInput from './TextInput';
import Image from 'next/image';
import { API_URL } from '../Helpers/types';
import ProcessingDialog from './ProcessingDialog';
import { useAppContext } from '../Context/DataProvider';

const BackId = () => {
  const value = useAppContext();
  const address = value.state.address;
  const defaultImage = '/image.jpeg';
  const [imgurl, setImgurl] = useState(defaultImage);
  const { toggleProcessing, closeDialog } = value;

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

    toggleProcessing();

    const formData = new FormData();

    let checkImg1 = document.getElementById('backImg').files.length;

    if (!checkImg1 == 1) {
      closeDialog();
    }
    // if (checkImg1 == 1) {
    console.log('okkkk');
    const element = document.getElementById('backImg');
    const file = element.files[0];
    formData.append('backImg', file);
    //console.log(formData, "hhhh");
    try {
      const res = await axios.post(
        API_URL + '/api/kyc/submit/nin/front/slip/' + address,
        formData
      );
      console.log(res.data, 'undefined');
      if (res.data.statusCode === 200) {
        closeDialog();

        console.log(res.data, 'successsssss');
        value.setProcessing(false);
        value.change(Stages.faceScan);
      } else {
        console.log(res.data, 'errrrrorrrrr');
      }
    } catch (err) {
      console.log(err);
      closeDialog();
    }
    // } else {

    //   console.log('empty Product image');
    // }
  };

  return (
    <div className="container">
      <CustomButtons title={'back'} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div>
          <h1 className="title"> Provide the Back of Your ID</h1>
          <h4>Photo must be of good quality</h4>
        </div>

        <div>
          <label
            htmlFor="backImg"
            className="custom-file-upload33b"
            onChange={onImageChange}
          >
            <Image src={imgurl} alt="" width={200} height={100} />
          </label>
          <input
            type="file"
            id="backImg"
            name="backImg"
            style={{ display: 'none' }}
            onChange={onImageChange}
          />
        </div>

        <CustomButtons
          title={imgurl === defaultImage ? 'choose' : 'next'}
          type={ButtonTypes.plain}
          onClick={submitFrontImg}
          disabled={imgurl === defaultImage ? true : false}
        />

        <ProcessingDialog />
      </div>
    </div>
  );
};

export default BackId;
