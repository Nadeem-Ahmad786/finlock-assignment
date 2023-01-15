import axios from "axios";
import "../axios";

export const signin = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
    const response  = await axios.post('/api/v1/login', data, config);
    return response
}
export const isToken = async()=>{
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },    
    };
    const response = await axios.get('/api/v1/checkToken', config);
    return response
}