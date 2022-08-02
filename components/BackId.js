import React, { useContext, useState } from "react";

import axios from "axios";

import AppContext from "../Context/AppContext";
import Stages from "../Context/Stages";
import ButtonTypes from "../Helpers/ButtonTypes";
import validateNIN from "../Helpers/validations/ValidateNIN";
import CustomButtons from "./CustomButtons";
import TextInput from "./TextInput";
import Image from "next/image";

const BackId = () => {
  const value = useContext(AppContext);
  const [imgurl, setImgurl] = useState("/image.jpeg");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const types = ["jpg", "png", "jpeg"];

      if (event.currentTarget.id === "backImg") {
        if (event.currentTarget.files.length === 0) {
          // setUserInfo({ ...userInfo, applicantImg: "" });
          // document.getElementById("output1").src = "";
        } else {
          let productFile = document.getElementById("backImg").files[0];

          let fileExtension = productFile.name.split(".").pop();
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

    let checkImg1 = document.getElementById("backImg").files.length;

    if (checkImg1 == 1) {
      console.log("okkkk");
      const element = document.getElementById("backImg");
      const file = element.files[0];
      formData.append("backImg", file);
      //console.log(formData, "hhhh");
      try {
        const res = await axios.post(
          "http://localhost:5000/api/kyc/submit/nin/front/slip/0x5dc86878f19E45dE95180E303B8Ff00792D4C4c8",
          formData
        );
        console.log(res.data, "undefined");
        if (res.data.statusCode === 200) {
          console.log(res.data, "successsssss");
          value.change(Stages.faceScan);
        } else {
          console.log(res.data, "errrrrorrrrr");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("empty Product image");
    }
  };

  return (
    <div className="container">
      <CustomButtons title={"back"} type={ButtonTypes.back} />
      <div className="kyc-modal">
        <div>
          <h1 className="title"> Provide the Back of Your ID</h1>
          <h4>Photo must be of good quality</h4>
        </div>

        <div>
          <label
            for="backImg"
            className="custom-file-upload33b"
            onChange={onImageChange}
          >
            <Image src={imgurl} width={200} height={100} />
          </label>
          <input
            type="file"
            id="backImg"
            name="backImg"
            style={{ display: "none" }}
            onChange={onImageChange}
            // className="d-none"
          />
        </div>

        <CustomButtons
          title={"choose"}
          type={ButtonTypes.plain}
          // onClick={() => {
          //   //check if the nin passes validation

          //   if (!validateNIN(value.state.client.nin)) {
          //     alert("An error occured");
          //     return;
          //   }

          //   //proceed to next stage
          //   value.change(Stages.backID);
          // }}
          onClick={submitFrontImg}
        />
      </div>
    </div>
  );
};

export default BackId;
