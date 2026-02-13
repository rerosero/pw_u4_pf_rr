<template>
  <div class="container">
    <h1>Estudiantes Matriculados</h1>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cursos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in estudiantesMatriculados" :key="est.id">
          <td>{{ est.id }}</td>
          <td>{{ est.nombre }}</td>
          <td>{{ est.apellido }}</td>
          <td>
            <ul>
              <li v-for="cur in est.cursos" :key="cur.id">
                {{ cur.nombre }}
                <button @click="cancelar(est.id, cur.id)">Cancelar Matricula</button>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { facadeTodosEstudiantes, facadeCancelarMatricula } from '@/clients/AcademiaClient';

export default {
  data() {
    return {
      estudiantes: [],
      mensaje: '',
    };
  },
  async created() {
    this.estudiantes = await facadeTodosEstudiantes(); // carga inicial
  },
  methods: {
    async cancelar(idEstudiante, idCurso) {
      try {
        await facadeCancelarMatricula(idCurso, idEstudiante);
        alert(`Matrícula cancelada para estudiante ${idEstudiante} en curso ${idCurso}`);
        // recargar los estudiantes para reflejar cambios
        this.estudiantes = await facadeTodosEstudiantes();
      } catch (err) {
        console.error(err);
        alert("No se pudo cancelar la matrícula");
      }
    }
  }, 
  computed:{
    estudiantesMatriculados() {
      return this.estudiantes.filter(est => est.cursos && est.cursos.length > 0);
    }
  }
};
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
li {
  display: flex;
  justify-content: space-between; 
  align-items: center;            
  margin-bottom: 5px;
}

li button {
  width: auto;                     
  padding: 5px 10px;
  margin: 0;
}

/* Botón */
button {
  width: 150px;
  padding: 5px;
  margin: 0 auto;            
  border: none;
  border-radius: 5px;
  background-color: #4caf50; 
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
  background-color: #e0f7e0;
}

</style>