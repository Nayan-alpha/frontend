import axios from 'axios'
import { createContext,useState,useEffect } from 'react'

export const User=createContext({})

export function UserContextProvider({children}) {
    const [User, setUser] = useState(null);
    useEffect(() =>{
        if(!User){
            axios.get('./profile').then(({data})=>{
                setUser(data)
            })
        }
    })
    return (
        <div>

        </div>
    )
}