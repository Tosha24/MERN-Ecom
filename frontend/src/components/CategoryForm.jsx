import React, { useEffect } from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
  imageUrl,
  setImageUrl
}) => {

  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dmchjg2yt",
        uploadPreset: "f2fmor0o",
        sources: ["local", "url", "camera"],
        cropping: true,
        multiple: false,
        folder: "E-COMMERCE",
        tags: ["Products"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
          toast.success("Image uploaded successfully");
        } else if (error) {
          toast.error(error?.data?.message || error.error);
        }
      }
    );
  };

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  
  return (
    <div className="p-3">
      <div className="space-y-3">
        <div className="flex justify-between">
          {imageUrl ? (
            <div className="text-center mb-6">
              <img
                src={imageUrl}
                alt="product"
                className="mx-auto max-h-64 w-28"
              />
              <button className="border text-white bg-pink-500 hover:bg-pink-600 px-4 block text-center rounded-lg cursor-pointer font-bold py-2" onClick={() => setImageUrl("")}>Remove</button>
            </div>
          ) : (
            <div>No image uploaded</div>
          )}
          <button
            className="border text-white bg-pink-500 hover:bg-pink-600 px-4 block text-center rounded-lg cursor-pointer font-bold py-2"
            onClick={openCloudinaryWidget}
          >
            Upload
          </button>
        </div>
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50" onClick={handleSubmit}>
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
