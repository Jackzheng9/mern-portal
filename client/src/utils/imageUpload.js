const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;


const uploadImage = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', upload_preset);
  data.append('cloud_name', cloud_name);
  const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,{
    method:"POST",
    body:data
  });
  
  const res = await uploaded.json()
  // console.log("result", res)
  return res;
}


export default uploadImage;