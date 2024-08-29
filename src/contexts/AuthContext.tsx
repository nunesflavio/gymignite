import {createContext, ReactNode, useState} from "react";
import {UserDTO} from "@dtos/UserDTO";
import {api} from "@services/api";


export type AuthContextDataProps = {
    user: UserDTO;
    signIn: ( email: string, password: string ) => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<UserDTO>({ } as UserDTO)

   async function signIn( email: string, password: string ) {
        /*setUser({
            id: '',
            name: '',
            email,
            avatar: '',

        })*/
       try {
            const { data } = await api.post('/sessions', { email, password })

            if (data.user) {
              setUser(data.user)
          }
      }catch (e) {
           throw e;

       }

   }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}