<template>
  <div class="container">
    <h1>Matricula</h1>

    <!-- Selección de estudiante -->
    <label for="estudiante">Seleccionar Estudiante:</label>
    <select v-model="estudianteSeleccionado" id="estudiante">
      <option value="">Seleccione un estudiante</option>
      <option v-for="est in estudiantes" :key="est.id" :value="est">{{ est.nombre }}</option>
    </select>

    <!-- Selección de curso -->
    <label for="curso">Seleccionar Curso:</label>
    <select v-model="cursoSeleccionado" id="curso">
      <option value="">Seleccione un curso</option>
      <option v-for="cur in cursos" :key="cur.id" :value="cur">{{ cur.nombre }}</option>
    </select>

    <!-- Botón de matricula -->
    <button @click="matricula">Matricular</button>

    <!-- Mensajes de éxito o error -->
    <p class="exito" v-if="exito">{{ exito }}</p>
    <p class="error" v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import { facadeConsultarTodosCursos, facadeTodosEstudiantes, facadeMatricula } from '@/clients/AcademiaClient';

export default {
  data() {
    return {
      cursos: [],
      estudiantes: [],
      cursoSeleccionado: null,
      estudianteSeleccionado: null,
      mensaje: '',
      exito: '',
      timer: null
    };
  },

  // Se ejecuta cuando el componente se monta
  async created() {
    try {
      // Cargar todos los cursos y estudiantes desde el backend
      this.cursos = await facadeConsultarTodosCursos();
      this.estudiantes = await facadeTodosEstudiantes();
    } catch (error) {
      console.error("Error cargando datos:", error);
      this.mensaje = "No se pudieron cargar cursos o estudiantes";
    }
  },

  methods: {
    // Función para limpiar formulario y mensajes
    limpiar() {
      this.mensaje = '';
      this.exito = '';
      this.cursoSeleccionado = null;
      this.estudianteSeleccionado = null;
      this.timer = null;
    },

    // Función para matricular un estudiante en un curso
    async matricula() {
      // Cancelar cualquier temporizador previo
      if (this.timer) clearTimeout(this.timer);

      // Validar selección
      if (!this.cursoSeleccionado || !this.estudianteSeleccionado) {
        this.mensaje = "Debes seleccionar un curso y un estudiante";
        this.timer = setTimeout(this.limpiar, 3000);
        return;
      }

      // Verificar si el estudiante ya está inscrito en el curso
      let yaInscrito = false;
      if (this.cursoSeleccionado.estudiantes) {
        for (let i = 0; i < this.cursoSeleccionado.estudiantes.length; i++) {
          if (this.cursoSeleccionado.estudiantes[i].id === this.estudianteSeleccionado.id) {
            yaInscrito = true;
            break; // Salimos del bucle si encontramos duplicado
          }
        }
      }

      if (yaInscrito) {
        this.mensaje = `El estudiante ${this.estudianteSeleccionado.nombre} ya está inscrito en ${this.cursoSeleccionado.nombre}`;
        this.timer = setTimeout(this.limpiar, 3000);
        return;
      }

      // Intentar matricular el estudiante
      try {
        await facadeMatricula(this.cursoSeleccionado.id, this.estudianteSeleccionado.id);

        // Actualizar la lista de estudiantes en el curso
        if (!this.cursoSeleccionado.estudiantes) this.cursoSeleccionado.estudiantes = [];
        // Agrega al estudiante al curso localmente para reflejar el cambio
        this.cursoSeleccionado.estudiantes.push(this.estudianteSeleccionado);

        this.exito = `Estudiante ${this.estudianteSeleccionado.nombre} inscrito en curso ${this.cursoSeleccionado.nombre}`;
        console.log(`Matriculando estudiante ${this.estudianteSeleccionado.id} en curso ${this.cursoSeleccionado.id}`);

        // Limpiar mensajes después de 3 segundos
        this.timer = setTimeout(this.limpiar, 2000);
      } catch (error) {
        console.error(error);
        this.mensaje = "No se pudo realizar la matrícula";
        this.timer = setTimeout(this.limpiar, 3000);
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label,
select {
  display: block;
  margin-bottom: 10px;
}

select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #aaa;
  font-size: 14px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

p.exito {
  color: green;
  font-weight: bold;
}

p.error {
  color: red;
  font-weight: bold;
}
</style>
