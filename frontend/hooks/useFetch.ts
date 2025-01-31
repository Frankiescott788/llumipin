import { AuthContext } from "@/context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useContext } from "react";

export default function useFetch() {

    const { setIsAuthenticated } = useContext(AuthContext);

    const getRestaurants = async (): Promise<AxiosResponse | null> => {

        const token = await AsyncStorage.getItem("token");
        if(!token) {
            setIsAuthenticated(false);
            return null;
        }

        return await axios.get("http://192.168.0.123:8080/api/restaurants", {
            headers : { Authorization : `Bearer ${token}`}
        });
    }

    const query = useQuery({
        queryKey : ["restaurants"],
        queryFn : getRestaurants,
        refetchInterval: 20000, // Refetch every 20 seconds
    });

    return query 
}