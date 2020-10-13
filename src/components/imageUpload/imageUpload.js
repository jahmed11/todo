import React, { useRef, useState, useEffect } from "react";

const ImageUpload = (props) => {
  const uploadImageRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const imageUploadHandler = () => {
    uploadImageRef.current.click();
  };
  const filePicked = (e) => {
    let pickedFile;
    let valid = null;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      valid = true;
    } else {
      setIsValid(false);
      valid = false;
    }
    props.onInput(props.id, pickedFile, valid);
  };
  return (
    <div>
      <input
        ref={uploadImageRef}
        type="file"
        style={{ display: "none" }}
        accept=".png,.jpg.,jpeg."
        onChange={filePicked}
      />
      <div>
        <div
          style={{
            margin: "15px 0",
            width: "150px",
            height: "150px",
            border: "1px solid",
            borderRadius: "6px 6px",
            textAlign: "center",
          }}
        >
          {previewUrl && (
            <img
              style={{ width: "150px", height: "150px" }}
              src={previewUrl}
              alt="profile"
            />
          )}
          {!previewUrl && <p>Please select an image</p>}
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={imageUploadHandler}
          type="button"
        >
          upload image
        </button>
      </div>
      {!isValid && <p>Error</p>}
    </div>
  );
};

export default ImageUpload;
