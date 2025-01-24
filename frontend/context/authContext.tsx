import { AuthContextInterface, User } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, ReactElement, useState, ReactNode, useEffect } from "react";

const defaultContext: AuthContextInterface = {
    currentUser: null,
    setCurrentUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    isLoading: true,
    setIsLoading: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(defaultContext);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps): ReactElement {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authenticate = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if(!token) {
                    setIsAuthenticated(false);
                    return;
                }

                const { status, data } = await axios.get("http://192.168.0.123:8080/api/session", {
                    headers : { Authorization : `Bearer ${token}` }
                });
                if(status === 200) {
                    setCurrentUser(data);
                    setIsAuthenticated(true)
                    return;
                }
             

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        authenticate()
    })

    return (
        <AuthContext.Provider  value={{
            currentUser,
            setCurrentUser,
            isAuthenticated,
            setIsAuthenticated,
            isLoading,
            setIsLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
}