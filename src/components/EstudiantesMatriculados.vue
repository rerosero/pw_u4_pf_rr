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
        <tr v-for="est in estudiantes" :key="est.id">
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
  }
};
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
li {
  display: flex;
  justify-content: space-between; /* separa nombre y botón */
  align-items: center;            /* centra verticalmente */
  margin-bottom: 5px;
}

li button {
  width: auto;                     /* que no tenga ancho fijo */
  padding: 5px 10px;
  margin: 0;
}

/* Botón */
button {
  width: 150px;
  padding: 5px;
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

</style>