import axios, { AxiosResponse } from "axios";
import { AuthForms } from "@/interfaces/interfaces";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {

    const router = useRouter();

    const signUp = async (data: AuthForms): Promise<AxiosResponse>  => {
        return await axios.post("http://192.168.0.123:8080/api/signup", data);

    }
    

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [emailIsFocused, setEmailIsFocused] = useState<boolean>(false);
    const [phoneIsFocused, setPhoneIsFocused] = useState<boolean>(false);
    const [passwordIsFocused, setPasswordIsFocused] = useState<boolean>(false);

    const [fieldErrors, setFieldErrors] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: async (data) => {
            await AsyncStorage.setItem("token", data.data.token);
            router.navigate("/(main)");
        },
        onError: (e : any) => {
            setFieldErrors(prevState => ({
                ...prevState,
                ...e.response.data
            }))
        },
    });

    const mutateSignup = (): void => {
        if (!username || !email || !phone || !password) {
            setFieldErrors(prevState => ({
                ...prevState,
                username: !username ? "username is required" : "",
                email: !email ? "email is required" : "",
                phone: !phone ? "phone is required" : "",
                password: !password ? "password is required" : ""
            }));
            return;
        }

        setFieldErrors(prevState => ({
            ...prevState,
            username:  "",
                email:  "",
                phone: "",
                password:  ""
        }))

        mutation.mutate({
            username,
            email,
            role : "user",
            phone,
            password
        });
    }

    return {
        setUsername,
        setEmail,
        setPhone,
        setPassword,
        isFocused,
        setIsFocused,
        emailIsFocused,
        setEmailIsFocused,
        phoneIsFocused,
        setPhoneIsFocused,
        passwordIsFocused,
        setPasswordIsFocused,
        fieldErrors,
        setFieldErrors,
        mutateSignup,
        isLoading : mutation.isPending
    }
}