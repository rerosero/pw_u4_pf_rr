import axios from "axios";
const baseUrl= 'http://localhost:8082/auth/api/v1.0/auth/token';
const obtenerUsuario = async(user, password)=>{
    const data = await axios.get(`${baseUrl}?user=${user}&password=${password}`).then(r=>r.data);
    return data;
}
export const facadeObtenerUsuario= async(user, password)=>{
    return obtenerUsuario(user, password);
}