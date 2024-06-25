import { useGetIdentity } from "@refinedev/core"

export const  DashboardPage=()=>{
    
    const { data: identity } = useGetIdentity<any>();
  
    
    return <h1 style={{color:'black'}}>Welcome ,{identity?.name}</h1>
}