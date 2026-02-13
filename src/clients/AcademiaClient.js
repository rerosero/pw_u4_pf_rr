import axios from 'axios'

const baseUrl = 'http://localhost:8081/academia/api/v1.0/cursos';
const baseUrl1= 'http://localhost:8081/academia/api/v1.0/estudiantes';

const consultarTodosCursos = async()=>{
    const token = localStorage.getItem('token');

    const data = await axios.get(`${baseUrl}`,{headers:{Authorization: `Bearer ${token}`}}).then(r=>r.data);
    return data;
}
const consultaridCursos = async(id)=>{
    const token = localStorage.getItem('token');
     const data = await axios.get(`${baseUrl}/${id}`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.data);
     return data;
}
const guardarCursos = async(body)=>{
    const token = localStorage.getItem('token');
    const data = await axios.post(`${baseUrl}`,body,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.data);
    return data;
}
const actualizarCursos = async(id, body)=>{
    const token = localStorage.getItem('token');
    const data = await axios.put(`${baseUrl}/${id}`, body,{headers:{Authorization:`Bearer ${token}`}}).then(r=> r.data);
    return data;
}
const actualizarParcialCursos = async(id,body)=>{
    const token = localStorage.getItem('token');
    const data = await axios.patch(`${baseUrl}/${id}`,body,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.data);
    return data;
}
const eliminarCursos = async(id)=>{
    const token = localStorage.getItem('token');
    const data = await axios.delete(`${baseUrl}/${id}`, {headers:{Authorization: `Bearer ${token}`}}).then(r=>r.data);
    return data;
}
export const facadeConsultarTodosCursos= async()=>{
    return await consultarTodosCursos();
}
export const facadeConsultarIdCursos= async(id)=>{
    return await consultaridCursos(id);
}
export const facadeActualizarCursos = async(id, body)=>{
    return await actualizarCursos(id,body);
}
export const facadeActualizarParcialCursos = async(id, body)=>{
    return await actualizarParcialCursos(id, body);
}
export const facadeEliminarCursos = async(id)=>{
    return await eliminarCursos(id);
}
export const facadeGuardarCursos = async(body)=>{
    return await guardarCursos(body);
}
//----------------------------------------------------------------//
const listaEstudiantes= async()=>{
    const token = localStorage.getItem('token');
    const data = await axios.get(`${baseUrl1}`, {headers:{Authorization:`Bearer${token}`}}).then(r=>r.data);
    return data;
}

const obtenerIdEstudiante = async(id) =>{
    const token = localStorage.getItem('token');
    const data = await axios.get(`${baseUrl1}/${id}`,{headers:{Authorization:`Bearer${token}`}}).then(r=>r.data);
    return data;
}
const guardarEstudiante = async(body)=>{
    const token = localStorage.getItem('token');
    const data = await axios.post(`${baseUrl1}`,body,{headers:{Authorization:`Bearer${token}`}}).then(r=R.data);
    return data;
}
const actualizarEstudiantes = async(id, body)=>{
    const token = localStorage.getItem('token');
    const data = await axios.put(`${baseUrl1}/${id}`,body,{headers:{Authorization:`Bearer${token}`}}).then(r=>r.data);
    return data;
}
const actualizarParcialEstudiantes = async(id, body) =>{
    const token = localStorage.getItem('token');
    const data = await axios.patch(`${baseUrl1}/${id}`,body,{headers:{Authorization:`Bearer${token}`}}).then(r=>r.data);
    return data;
}
const eliminarEstudiante = async(id)=>{
    const token = localStorage.getItem('token');
    const data = await axios.delete(`${baseUrl1}/${id}`,{headers:{Authorization:`Bearer${token}`}}).then(r=>r.data);
    return data;
}
 export const facadeTodosEstudiantes = async()=>{
    return listaEstudiantes();
 }
 export const facadeIdEstudiantes = async(id)=>{
    return obtenerIdEstudiante(id);
 }
 export const facadeGuardarEstudiantes = async(body)=>{
    return guardarEstudiante(body);
 }
 export const facadeActualizarEstudiante = async(id, body)=>{
    return actualizarEstudiantes(id,body);
 }
 export const facadeActualizarParcialEstudiantes = async(id,body)=>{
    return actualizarParcialEstudiantes(id,body);
 }
 export const facadeEliminarEstudiantes= async(id)=>{
    return eliminarEstudiante(id);
 }
//------------------------------------------------//
const asignarCursoEstudiante = async(idCurso,idEstudiante)=>{
    const token = localStorage.getItem('token');
    const data = await axios.post(`${baseUrl1}/inscribir/${idEstudiante}/curso/${idCurso}`,{headers:{Authorization:`Bearer${token}`}}).then(r=>r.data);
    return data;
}

const eliminarCursoEstudiante = async(idCurso,idEstudiante)=>{
    const token = localStorage.getItem('token');
    const data = await axios.delete(`${baseUrl1}/cancelar/${idEstudiante}/curso/${idCurso}`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.data);
    return data;
}

export const facadeMatricula = async(IdCurso, IdEstudiante)=>{
    return await asignarCursoEstudiante(IdCurso,IdEstudiante);
}

export const facadeCancelarMatricula = async(idCurso,IdEstudiante)=>{
    return await eliminarCursoEstudiante(idCurso, IdEstudiante);
}