import { useMutation } from "react-query";
import { api } from "../libs/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUKSES, USER_LOGIN } from "../store/slice/authSlice";
import { jwtDecode } from "jwt-decode";


type inputLogin = {
  email: string;
  password: string;
};


const useLogin = () => {
  const [form, setForm] = useState<inputLogin>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [errText, setErrText] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { mutate: login } = useMutation(
    async (e: any) => {
      e.preventDefault();
      try {
        const response = await api.post("/auth/login", form);
        const token = response.data.token;
        dispatch(LOGIN_SUKSES(token));
        saveDataUser(); 
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        }
      } catch (err: any) {
        console.log(err.response.data.message);
        setErrText(err.response.data.message);
        setShowToast(true);
      }
    },
  );
  const saveDataUser = () => {
    const token: any = localStorage.getItem("token");
    if (token) {
      const payload: any = jwtDecode(token);
      dispatch(USER_LOGIN(payload.user));
    }
  };

  return {
    form,
    errText,
    showToast,
    handleChange,
    login,
    saveDataUser,
  };
};

export default useLogin;
