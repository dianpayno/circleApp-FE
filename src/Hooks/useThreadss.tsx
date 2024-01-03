import { useMutation } from "react-query";
import { api } from "../libs/api";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useThreads } from "../context/ThreadsContex";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

type post = {
  content: string;
  image: []|string[];
  userId: number;
};
const useThreadss = () => {
  const user = useAppSelector((state: RootState) => state.auth);
  const [image, setImage] = useState<FileList | null>(null);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { refetchThreads } = useThreads();
  const [data, setData] = useState<post>({
    content: "",
    image: [],
    userId: 0,
  });
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const url: any = [];
    if (!image) return;
    const uploadFile = () => {
      for (let i = 0; i < image.length; i++) {
        const name = new Date().getTime() + image[i].name;
        const storageRef = ref(storage, `cirleApps/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, image[i]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            switch (snapshot.state) {
              case "paused":
                setProgress(progress);
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
             
                break;
              case "success":
               
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
              url.push(downloadURL);
              setData({
                ...data,
                image: url,
              });
             
            });
          }
        );
      }
    };
 
    image && uploadFile();
  }, [image]);


  const handleChangeImage = (e: any) => {
    if (e.target.files) {
      const selectedImage = e.target.files;
      setImage(selectedImage);
      const imgUrl: string[] = [];
      for (let i = 0; i < selectedImage.length; i++) {
        const url = URL.createObjectURL(selectedImage[i]);
        imgUrl.push(url);
      }
      setImagesPreviews(imgUrl);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      userId: user.id,
      [name]: value,
    });
  };

  const  token = localStorage.getItem("token")
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
  const { mutate: addPost } = useMutation(
    async (e: any) => {
      e.preventDefault();
      try {
       const res = await api.post("/threads", data, {headers});
       console.log(res)
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        refetchThreads();
        setIsOpen(false);
        setImagesPreviews([]);
        setImage(null);
        setData({
          content: "",
          image: [],
          userId: user.id,
        });
      },
    }
  );

  const { mutate:deteleThreads } = useMutation(async(id:number)=>{
    try{
      const res = await api.delete(`/threads/${id}`, {headers})
      console.log(res)
    }
    catch (err){
      console.log(err)
    }
  },{
    onSuccess:()=>{
      refetchThreads();
    }
  })


  return {
    data,
    deteleThreads,
    setData,
    handleChange,
    imagesPreviews,
    setImagesPreviews,
    handleChangeImage,
    isOpen,
    setIsOpen,
    addPost,
    progress
  };
};

export default useThreadss;
