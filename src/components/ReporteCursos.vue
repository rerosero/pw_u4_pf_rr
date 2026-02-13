<template>
  <div class="container">
        <h1>Reporte Cursos</h1>
        <button @click="consultarCursos">Consultar</button>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Profesor</th>
                    <th>Links</th>
                    <th v-if="estaLogueado">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in json" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.profesor }}</td>
                    <td>
                       <ul>
                          <li v-for="(link, linkIndex) in item.links" :key="linkIndex">
                              <a :href="link.href">{{ link.rel }}</a>
                          </li>
                      </ul>
                    </td>
                    <td>
                      <button class="eliminar-btn" @click="eliminarCursos(item.id)" v-if="estaLogueado">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import {facadeConsultarTodosCursos, facadeEliminarCursos} from'../clients/AcademiaClient'
export default {
    methods:{
        async consultarCursos(){
            const resultado = await facadeConsultarTodosCursos();
            this.json=resultado;
        },
        async eliminarCursos(id){
            await facadeEliminarCursos(id);
            this.consultarCursos();
        }
    },
    data(){
        return{
            json:null
        }
    },
    computed:{
      estaLogueado(){
        return localStorage.getItem('token')!==null;
       }
    },
}
</script>

<style scoped>

.container {
  max-width: 900px;          
  margin: 50px auto;          
  padding: 20px;              
  background-color: #f9f9f9;  
  border-radius: 10px;        
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: Arial, sans-serif;
}

/* Título */
h1 {
  text-align: center;
  color: #333;
}

/* Botón */
button {
  width: 150px;
  padding: 10px;
  margin: 0 auto;          
  border: none;
  border-radius: 5px;
  background-color: #4caf50; 
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

/* Tabla */
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: #4caf50;
  color: white;
  padding: 10px;
}

/* Celdas de la tabla */
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}


/* Hover sobre filas */
tbody tr:hover {
  background-color: #e0f7e0; /* resalta fila al pasar mouse */
}
.eliminar-btn {
  background-color: #e74c3c; 
  width: 100px;
}

</style>
