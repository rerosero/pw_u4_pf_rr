<template>
  <div class="container">
    <h1>Actualizar Curso</h1>

    <!-- Buscar curso por ID -->
    <input
      v-model="id"
      type="number"
      placeholder="Ingrese ID del curso y presione Enter"
      @keyup.enter="buscarCurso"
    />
    <button @click="buscarCurso">Buscar</button>

    <!-- Mostrar formulario solo si existe curso -->
    <div v-if="curso.codigo" class="datos">
      <hr />

      <input v-model="curso.codigo" placeholder="Código" />
      <input v-model="curso.nombre" placeholder="Nombre" />
      <input v-model="curso.profesor" placeholder="Profesor" />
      <input v-model="curso.descripcion" placeholder="Descripción"/>

      <button @click="actualizar">Guardar Cambios</button>
    </div>

    <!-- Mensaje -->
    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import {
  facadeActualizarCursos,
  facadeConsultarIdCursos
} from "@/clients/AcademiaClient";

export default {
  data() {
    return {
      id: "",
      curso: {
        codigo: "",
        nombre: "",
        profesor: "",
        descripcion:""
      },
      mensaje: ""
    };
  },

  methods: {
    // Buscar curso por ID
    async buscarCurso() {
      this.mensaje = "Buscando...";

      try {
        this.curso = await facadeConsultarIdCursos(this.id);
        this.mensaje = "Curso cargado. Puedes editarlo.";
      } catch {
        this.mensaje = "No se encontró el curso con ese ID.";
        this.limpiar();
      }
    },

    // Guardar cambios
    async actualizar() {
      try {
        await facadeActualizarCursos(this.id, this.curso);
        this.mensaje = "¡Curso actualizado con éxito!";
      } catch {
        this.mensaje = "Error al actualizar el curso.";
      }
    },

    // Limpiar campos
    limpiar() {
      this.curso = {
        codigo: "",
        nombre: "",
        profesor: ""
      };
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
}
.datos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #aaa;
  font-size: 14px;
}
button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color:green;
  color: white;
  font-size: 16px;
  cursor: pointer;
  gap: 10px;
  margin-left: 10px;
}
.p {
  font-weight: bold;
  margin-top: 10px;
}

</style>