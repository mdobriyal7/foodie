import React, { useState, useEffect, useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./AddDish.css";
import FormWrapper from "../../components/FormWrapper";
import Header from "../../components/Header";
import { useCreateFoodMutation } from "../foodSlice";
import { BeatLoader } from "react-spinners";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function AddDish() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imageFormatError, setImageFormatError] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    price: 0,
    description: "",
  });
  console.log(productForm);

  const [
    addNewFood,
    { isLoading, isSuccess, isUninitialized },
  ] = useCreateFoodMutation();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) {
      alert("Only drop one file at a time");
      return;
    }
    const file = acceptedFiles[0];
    setFile(file);
    setFileName(file.name);
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop: onDrop, noClick: true });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleFileUpload = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      console.log("Please select your file");
    }
  };

  useEffect(() => {
    if (file) {
      console.log("file::: ", file);
      console.log("fileName::: ", fileName);
    }
  }, [file, fileName]);

  const handleProductFormChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isImageValid = validateImageFormat();
    if (!isImageValid) {
      window.alert(`Image Error:: ${imageFormatError}`);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", productForm.name);
    formData.append("price", productForm.price);
    formData.append("description", productForm.description);

    setProductForm({
      name: "",
      price: 0,
      description: "",
    });
    setFile(null);
    setFileName("");
    if (!isLoading) {
      await addNewFood(formData).then(() => {
        toast.info("Food Added Sucessfully!", {
          autoClose: 1500,
        });
      });
    }
  };

  const validateImageFormat = () => {
    if (file === null) {
      toast.info("Please select an Image.", {
        autoClose: 1500,
      });
      return false;
    }
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setImageFormatError("Only JPG and PNG formats are allowed.");
      return false;
    }
    setImageFormatError("");
    return true;
  };

  let content;

  if (isUninitialized||isSuccess) {
    content = (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4 items-center justify-between">
          <label htmlFor="name">Food Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={productForm.name}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-3/4"
          />
        </div>

        <div className="flex space-x-4 items-center justify-between">
          <label htmlFor="price">Price(net)</label>
          <input
            id="price"
            type="number"
            name="price"
            value={productForm.price}
            onChange={handleProductFormChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-3/4"
          />
        </div>

        <div className="flex space-x-4 items-center justify-between">
          <label htmlFor="priceGross">Add Description</label>
          <textarea
            id="description"
            type="text"
            name="description"
            value={productForm.description}
            onChange={handleProductFormChange}
            rows={10}
            required
            className="border border-gray-300 rounded px-4 py-2 w-3/4"
          />
        </div>

        <div className="flex space-x-4 items-center justify-between">
          <div className="w-1/2">
            <p>Upload Image</p>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-between">
            <div
              {...getRootProps({ style })}
              className="border border-gray-300 rounded py-2 w-full"
            >
              <input {...getInputProps()} />
              <h2 style={{ fontWeight: 600 }}>Drop Product Image here</h2>
              <p className="pdf-size-msg mb-4">
                Format: Image(jpg/png) - Max. size: 50 M.B
              </p>
              <p style={{ color: "red" }}>
                {fileName ? `FILE : ${fileName}` : ""}
              </p>
            </div>

            <div className="my-2">
              <b>OR</b>
            </div>
            <div>
              <label htmlFor="file-upload" className="custom-file-upload">
                <IoMdAdd style={{ fontSize: "24px" }} />
              </label>
              <input id="file-upload" type="file" onChange={handleFileUpload} />
            </div>
            <p className="upload-manually">Upload Manually</p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Details
        </button>
      </form>
    );
  }

  if (isLoading) {
    content = (
      <div className="flex items-center justify-center">
        <BeatLoader color={"green"} />
      </div>
    );
  }

  return (
    <>
      <FormWrapper>
        <Header category="Menu" title="Add New Dish" />
        {content}
      </FormWrapper>
    </>
  );
}

export default AddDish;
