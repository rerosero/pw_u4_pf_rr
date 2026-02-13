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
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import {facadeConsultarTodosCursos} from'../clients/AcademiaClient'
export default {
    methods:{
        async consultarCursos(){
            const resultado = await facadeConsultarTodosCursos();
            this.json=resultado;
        }
    },
    data(){
        return{
            json:null
        }
    }

}
</script>

<style scoped>
/* Contenedor principal */
.container {
  max-width: 900px;          /* ancho máximo del reporte */
  margin: 50px auto;          /* centrado horizontal y algo de margen superior */
  padding: 20px;              /* espacio interno */
  background-color: #f9f9f9;  /* fondo gris claro */
  border-radius: 10px;        /* esquinas redondeadas */
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); /* sombra ligera */
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
  margin: 0 auto;            /* centra el botón */
  border: none;
  border-radius: 5px;
  background-color: #4caf50; /* verde */
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
  border-collapse: collapse; /* quita espacios entre celdas */
  text-align: left;
}

/* Encabezados de la tabla */
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

/* Filas alternas */
tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Hover sobre filas */
tbody tr:hover {
  background-color: #e0f7e0; /* resalta fila al pasar mouse */
}

/* Opcional: texto centrado en algunas columnas */
td:nth-child(1), td:nth-child(5) {
  text-align: center;
}
</style>
