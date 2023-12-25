import { useMutation } from "react-query";
import {useState } from "react";
import { api } from "../libs/api";
import { useNavigate } from "react-router-dom";

type inputRegister = {
  full_name: string;
  username: string;
  email: string;
  password: string;
};
const useRegister = () => {
  const [form, setForm] = useState<inputRegister>({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };



//   const handleCheck = async (e: any) =>  {
//     e.preventDefault();
// try{
//     if (form.full_name === "") {
//       setErrorText("name is empty");
//       setShowToast(true);
//       return;
//     } else if (form.username === "") {
//       setErrorText("username is empty");
//       setShowToast(true);
//       return;
//     } else if (form.email === "") {
//       setErrorText("email is empty");
//       setShowToast(true);
//       return;
//     } else if (form.password === "" && form.password.length < 8) {
//       setErrorText("password is empty");
//       setShowToast(true);
//       return;
//     } else {
//       await api.post("/auth/register", form);
//       navigate("/login");
//     }
// } catch (err) {
//   console.log(err);
// }
//   };

const { mutate: register } = useMutation(
  async (e: any) => {
      e.preventDefault()
      try{
        if (form.full_name === "") {
          setErrorText("name is empty");
          setShowToast(true);
          return;
        } else if (form.username === "") {
          setErrorText("username is empty");
          setShowToast(true);
          return;
        } else if (form.email === "") {
          setErrorText("email is empty");
          setShowToast(true);
          return;
        } else if (form.password === "" && form.password.length < 8) {
          setErrorText("password is empty");
          setShowToast(true);
          return;
        } else {
          await api.post("/users", form);
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
  } 
)


  return {
    form,
    handleChange,
    errorText,
    showToast,
    register
   
  };
};

export default useRegister;
