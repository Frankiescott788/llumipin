import { SigninAuthForm } from "@/interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/authContext";

export default function useSignin() {

    const router = useRouter();

    const signIn = async (data : SigninAuthForm): Promise<AxiosResponse> => {
        return await axios.post("http://192.168.0.123:8080/api/signin", data);
    };

    const [fieldErrors, setFieldErrors] = useState({
        email: "",
        password: ""
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailIsFocused, setEmailIsFocused] = useState<boolean>(false);
    const [passwordIsFocused, setPasswordIsFocused] = useState<boolean>(false);

    const { setIsAuthenticated, setCurrentUser } = useContext(AuthContext);

    const mutation = useMutation({
        mutationFn : signIn,
        onSuccess : async (res) => {
            setCurrentUser(res.data.user);
            await AsyncStorage.setItem("token", res.data?.token);
            setIsAuthenticated(true);
            router.navigate("/(main)");
        },
        onError : (e : any) => {
           const errorMessage = e.response?.data?.message.toLowerCase();
           if (errorMessage?.includes("no account found with this email. please double-check or sign up.")) {
               setFieldErrors(prevstate => ({
                   ...prevstate,
                   email: e.response.data.message
               }));
           };
           if (errorMessage?.includes("wrong password")) {
            setFieldErrors(prevstate => ({
                ...prevstate,
                password: e.response.data.message
            }));
        };
        },
    });

    const mutateSignin = () => {
        setFieldErrors({
            email : "",
            password : ""
        })
        if(!email || !password) {
            setFieldErrors(prevErrors => ({
                ...prevErrors,
                email : !email ? "please provide an email" : "",
                password : !password ? "please provide a password" : ""
            }));
            return;
        }
        mutation.mutate({ email, password });
    };

    return {
        setEmail,
        setPassword,
        emailIsFocused,
        setEmailIsFocused,
        passwordIsFocused,
        setPasswordIsFocused,
        mutateSignin,
        fieldErrors,
        isPending : mutation.isPending
    }

}