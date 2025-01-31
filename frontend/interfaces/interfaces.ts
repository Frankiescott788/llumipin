export interface AuthForms {
    username: string;
    email: string;
    phone: string;
    role : string;
    password: string;
}

export interface SigninAuthForm extends Omit<AuthForms, 'username' | 'phone' | 'role'> {
    username?: string;
    phone?: string;
    role?: string
}

export interface User {
    username : string,
    email : string,
    phone : string,
    role : string
}

export interface AuthContextInterface {
    currentUser: User | null;
    setCurrentUser: (user : User | null) => void,
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    isLoading : boolean,
    setIsLoading : (isLoading : boolean) => void
};

export interface RestaurantInterface {
    _id : string,
    name : string,
    owenerId : string,
    contactNumber : string,
    description : string,
    address: {
        street : string,
        city : string,
        state : string,
        zipCode : string,
        country : string
    }
    cuisine : string[],
    averageRating : string,
    createdAt : string
    openingHours : string
};


