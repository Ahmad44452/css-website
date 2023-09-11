import "./App.css";
import { useState } from "react";
import FullPageNavbar from "./components/fullPageNavbar";
import Dropdown from "react-dropdown";
import ImageUploading from "react-images-uploading";
import "react-dropdown/style.css";
import "./customDropdownStyles.css";
import {
  HomeFormContainer,
  HomeForm,
  JoinUsTitle,
  FormTextInput,
  InputGroup,
  InputContainer,
  InputLabel,
  MaskedInput,
  UploadImage,
  SubmitButton,
  SubmissionError,
  SubmissionSuccess,
  LoadingScreen,
} from "./components/homeForm";
import axios from "axios";

const batchOptions = [
  "Select your batch",
  "SP21",
  "FA21",
  "SP22",
  "FA22",
  "SP23",
  "FA23",
];
const defaultBatchOption = batchOptions[0];

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    batch: batchOptions[0],
    registrationNo: "",
    phoneNo: "",
    image: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [pfpImage, setPfpImage] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onPfpImageChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setPfpImage(imageList);
    setFormData((formData) => ({
      ...formData,
      image: imageList[0].data_url,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.firstName === "") {
      setError("Please enter first name");
      setLoading(false);
      return;
    } else if (formData.secondName === "") {
      setError("Please enter second name");
      setLoading(false);
      return;
    } else if (formData.email === "") {
      setError("Please enter email");
      setLoading(false);
      return;
    } else if (formData.batch === defaultBatchOption) {
      setError("Please select a batch");
      setLoading(false);
      return;
    } else if (formData.registrationNo === "") {
      setError("Please enter registration number");
      setLoading(false);
      return;
    } else if (formData.registrationNo.replace("_", "").length !== 12) {
      setError("Please enter valid registration number");
      setLoading(false);
      return;
    } else if (formData.phoneNo === "") {
      setError("Please enter phone number");
      setLoading(false);
      return;
    } else if (formData.phoneNo.replace("_", "").length !== 14) {
      setError("Please enter valid phone number");
      setLoading(false);
      return;
    } else if (formData.image === "") {
      setError("Please upload your image");
      setLoading(false);
      return;
    }
    // console.log(formData);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_HOST}/api/form/addsubmission`,
        formData
      )
      .then(() => {
        setSuccess("Your applications has been received");
      })
      .catch((error) => {
        // console.log(error)
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen>
          <span></span>
        </LoadingScreen>
      )}
      <FullPageNavbar />
      <HomeFormContainer>
        <HomeForm onSubmit={handleSubmit}>
          <JoinUsTitle>Join Us!</JoinUsTitle>

          <InputContainer>
            <InputGroup>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <FormTextInput
                type="text"
                placeholder="First Name"
                id="firstName"
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    firstName: e.target.value,
                  }))
                }
                required
              />
            </InputGroup>
            <InputGroup>
              <InputLabel htmlFor="secondName">Second Name</InputLabel>
              <FormTextInput
                type="text"
                placeholder="Second Name"
                id="secondName"
                required
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    secondName: e.target.value,
                  }))
                }
              />
            </InputGroup>
          </InputContainer>

          <InputContainer>
            <InputGroup>
              <InputLabel htmlFor="email">Email</InputLabel>
              <FormTextInput
                type="email"
                placeholder="Email"
                id="email"
                required
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    email: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>Batch</InputLabel>
              <Dropdown
                options={batchOptions}
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    batch: e.value,
                  }))
                }
                value={defaultBatchOption}
                placeholder="Select your batch"
              />
            </InputGroup>
          </InputContainer>

          <InputContainer>
            <InputGroup>
              <InputLabel htmlFor="regNo">Registration no</InputLabel>
              <MaskedInput
                id="regNo"
                mask={`${
                  formData.batch === defaultBatchOption
                    ? "aa99"
                    : formData.batch.toUpperCase()
                }-aaa-999`}
                maskChar="_"
                alwaysShowMask="true"
                required
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    registrationNo: e.target.value,
                  }))
                }
                // value={props.value}
                // onChange={props.onChange}
              ></MaskedInput>
            </InputGroup>
            <InputGroup>
              <InputLabel htmlFor="phoneNo">Phone no</InputLabel>
              <MaskedInput
                id="phoneNo"
                mask="+\92999-9999999"
                maskChar="_"
                alwaysShowMask="true"
                required
                onChange={(e) =>
                  setFormData((formData) => ({
                    ...formData,
                    phoneNo: e.target.value,
                  }))
                }
                // value={props.value}
                // onChange={props.onChange}
              ></MaskedInput>
            </InputGroup>
          </InputContainer>

          {/* Image upload div*/}
          <InputContainer>
            <ImageUploading
              value={pfpImage}
              onChange={onPfpImageChange}
              dataURLKey="data_url"
              acceptType={["jpg", "jpeg", "png"]}
            >
              {({
                imageList,
                onImageUpload,
                // onImageRemoveAll,
                // onImageUpdate,
                // onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <UploadImage
                  style={isDragging ? { background: "#000" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  {imageList.length === 0 ? (
                    <>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 640 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
                      </svg>

                      <p>Click or drop your image here</p>
                    </>
                  ) : (
                    imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="100" />
                      </div>
                    ))
                  )}
                </UploadImage>
              )}
            </ImageUploading>
          </InputContainer>

          {error && <SubmissionError>{error}</SubmissionError>}

          {success && <SubmissionSuccess>{success}</SubmissionSuccess>}

          <InputContainer $marginBottom={"0px"}>
            <SubmitButton type="submit" />
          </InputContainer>
        </HomeForm>
      </HomeFormContainer>
    </>
  );
};

export default App;
