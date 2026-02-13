<template>
    <div class="container">
        <h1>Actualizar Estudiante</h1>

        <!-- Buscar estudiante por ID -->
        <input v-model="id" type="number" placeholder="Ingrese ID del estudiante y presione Enter"
            @keyup.enter="buscarEstudiante" />
        <button @click="buscarEstudiante">Buscar</button>

        <!-- Mostrar formulario solo si existe estudiante -->
        <div v-if="estudiante.nombre" class="datos">
            <hr />

            <input v-model="estudiante.nombre" placeholder="Nombre" />
            <input v-model="estudiante.apellido" placeholder="Apellido" />
            <input v-model="estudiante.email" placeholder="Email" />
            <input v-model="estudiante.celular" placeholder="Celular" />

            <button @click="actualizar">Guardar Cambios</button>
        </div>

        <!-- Mensaje -->
        <p v-if="mensaje">{{ mensaje }}</p>
    </div>
</template>

<script>
import {facadeActualizarEstudiante,facadeIdEstudiantes} from "@/clients/AcademiaClient";
export default {
    data() {
        return {
            id: "",
            estudiante: {
                nombre: "",
                apellido: "",
                email: "",
                celular: ""
            },
            mensaje: ""
        };
    },
    methods: {
        // Buscar estudiante por ID
        async buscarEstudiante() {
            this.mensaje = "Buscando...";

            try {
                this.estudiante = await facadeIdEstudiantes(this.id);
                this.mensaje = "Estudiante cargado. Puedes editarlo.";
            } catch (error) {
                this.mensaje = "No se encontró el estudiante con ese ID.";
                this.limpiar();
            }
        },

        // Guardar cambios
        async actualizar() {
            try {
                await facadeActualizarEstudiante(this.id, this.estudiante);
                this.mensaje = "¡Estudiante actualizado con éxito!";
            } catch (error) {
                this.mensaje = "Error al actualizar el estudiante.";
            }
        },

        // Limpiar campos
        limpiar() {
            this.estudiante = {
                nombre: "",
                apellido: "",
                email: "",
                celular: ""
            };
        }
    }

}
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