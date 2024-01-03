import { useEffect, useState } from "react";
import useFollows from "./useFollows";
import { api } from "../libs/api";
import { useMutation } from "react-query";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

const useEditProfile = () => {
    const {UserById, refetchUserbyId} = useFollows();
    const [image, setImage] = useState<FileList | null>(null);
    const [coverImage, setCoverImage] = useState<FileList| null>(null);
    const [coverPreviews, setCoverPreviews] = useState<string>(UserById?.cover_picture);
    const [imagesPreviews, setImagesPreviews] = useState<string>(UserById?.profile_picture);
    const [data, setData]=useState({
        full_name : UserById?.full_name,
        username : UserById?.username,
        profile_description : UserById.profile_description,
        profile_picture : UserById.profile_picture,
        cover_picture : UserById.cover_picture,

    })

    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }

    const handleChange = (e: any) => {
        const {name, value}=e.target
        setData({
            ...data,
            [name] : value
        })
    }

    const handleChangeAvatar = (e: any) => {
        if (e.target.files) {
          const selectedImage = e.target.files;
          setImage(selectedImage);
          setImagesPreviews(URL.createObjectURL(selectedImage[0]));
        }
      };
    
      const handleChangeCover = (e: any) => {
        if (e.target.files) {
          const selectedImage = e.target.files;
          setCoverImage(selectedImage);
          setCoverPreviews(URL.createObjectURL(selectedImage[0]));
        }
      }

      const {mutate:editProfile}=useMutation(async(e: any)=>{
        e.preventDefault();
          try {
            const res = await api.put("/editprofile", data, {headers})
            console.log(res.data);   
            return res
          } catch (error) {
            console.log(error)
          }
      },{
onSuccess:()=>{
    refetchUserbyId()
    setData({
        full_name : UserById?.full_name,
        username : UserById?.username,
        profile_description : UserById.profile_description,
        profile_picture : "",
        cover_picture : "",
    })
}

      })

      useEffect(() => {
        if (!image) return;
        const uploadFile = () => {
            const name = new Date().getTime() + image[0].name;
            console.log(name)
            const storageRef = ref(storage, `cirleAppsAvatar/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, image[0]);
    
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // setToastImage(true);
                // setUplodProgres(progress);
                console.log(progress);
                switch (snapshot.state) {
                  case "paused":
                    // setTitleToastImage("Upload is paused");
                    // setToastImage(true);
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
    
                    break;
                }
              },
              (error) => {
                // setTitleToastImage("Gagal menambahkan gambar produk");
                // setToastImage(true);
                console.log("error", error);
                console.log(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setData({
                    ...data,
                    profile_picture: downloadURL,
                  });
                 
                });
              }
            );
          }
      
        image && uploadFile();
      }, [image]);


      useEffect(() => {
        if (!coverImage) return;
        const uploadFile = () => {
            const name: any = new Date().getTime() + coverImage[0].name;
            const storageRef = ref(storage, `cirleAppsCover/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, coverImage[0]);
    
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // setToastImage(true);
                // setUplodProgres(progress);
                console.log(progress);
                switch (snapshot.state) {
                  case "paused":
                    // setTitleToastImage("Upload is paused");
                    // setToastImage(true);
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
    
                    break;
                }
              },
              (error) => {
                // setTitleToastImage("Gagal menambahkan gambar produk");
                // setToastImage(true);
                console.log("error", error);
                console.log(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setData({
                    ...data,
                   cover_picture : downloadURL,
                  });
                 
                });
              }
            );
          }
      
        coverImage && uploadFile();
      }, [coverImage]);
    



    
useEffect(() => {
    console.log(data)
    console.log("ini image",image)
    
},[data, image, coverImage])
  return{
data,
handleChange,
imagesPreviews,
handleChangeAvatar,
handleChangeCover,
coverPreviews,
editProfile

  }
}

export default useEditProfile