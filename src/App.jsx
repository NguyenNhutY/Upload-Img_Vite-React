import { useDropzone } from "react-dropzone";
import placeImage from "./assets/image.svg";
import axios from "axios";
import { useState } from "react";
import Loading from "./Loading";
import Preview from "./Preview";
import { IoIosArrowBack } from "react-icons/io";

function App() {
  const url = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept: { "image/*": [".jpeg", ".png", ".svg" , ".jpg"] },
    onDrop,
  });
  async function onDrop(acceptedFiles) {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("imagevalue", acceptedFiles[0]);
      const res = await axios.post(url + "/api/v1/uploadImage", data);
      // console.log(res);
      setImageUrl(res.data.data.secure_url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error in catch", error);
    }
  }
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center relative">
      {imageUrl !== "" ? (
        <div>
          <Preview imageUrl={imageUrl} />
          <button
            className="w-fit text-xs mt-4 bg-blue-500 border h-full px-3 py-1.5 rounded-lg border-none text-white cursor-pointer flex gap-1 items-center whitespace-nowrap"
            onClick={() => {
              setImageUrl("");
            }}
          >
            {" "}
            <IoIosArrowBack color="white" /> <p>Back to upload</p>
          </button>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.1)] items-center px-6 py-8 font-medium">
          <h2 className="text-lg text-[#4F4F4F] ">Upload your image</h2>
          <p className="text-[10px] text-[#828282]">
            File should be jpeg,Png...
          </p>
          <div
            {...getRootProps()}
            className="border-dashed border rounded-md flex flex-col justify-evenly items-center bg-[#F6F8FB] border-[#97BEF4] cursor-pointer min-w-[338px] h-52 "
          >
            <input {...getInputProps()} />
            <img src={placeImage} alt="upload" />
            {isDragActive ? (
              <p className="text-xs tracking-tight  text-[#BDBDBD]">
                Drop here !
              </p>
            ) : (
              <p className="text-xs tracking-tight  text-[#BDBDBD] ">
                Drag & Drop your image here
              </p>
            )}
          </div>
          <p className="text-xs text-[#BDBDBD] relative -top-0.5">Or</p>
          <button
            onClick={open}
            className="bg-blue-500 border px-3 py-1.5  rounded-lg text-xs border-none text-white cursor-pointer"
          >
            Choose a file
          </button>
        </div>
      )}
      <footer className="absolute bottom-0.5 text-[#A9A9A9] text-sm">
        <p>created by <span className="font-semibold underline">Akash kumar</span> - devChallenges.io</p>
      </footer>
    </div>
  );
}
export default App;
