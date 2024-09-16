import  {useState,createContext,useContext} from "react";
import App from './App'
import * as React from "react";


export const AppContext = createContext(null);



export function AppProvider({children}){
    const {test,SetTest} = useState(null)
    const value = {
        test
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}


