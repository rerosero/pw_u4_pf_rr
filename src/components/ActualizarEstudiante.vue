<template>
    <div class="container">
        <h1>Actualizar Estudiante</h1>

        <!-- Buscar estudiante por ID -->
        <input v-model="id" type="number" placeholder="Ingrese ID del estudiante y presione Enter"
            @keyup.enter="buscarEstudiante" />
        <button @click="buscarEstudiante">Buscar</button>

        <!-- Mostrar formulario solo si existe estudiante -->
        <div v-if="estudianteCargado" class="datos">
            <hr />
            <label for="nombre">Nombre:</label>
            <input v-model="estudiante.nombre" placeholder="Nombre" id="nombre"/>
            <label for="apellido">Apellido:</label>
            <input v-model="estudiante.apellido" placeholder="Apellido" id="apellido"/>
            <label for="email">Email:</label>
            <input v-model="estudiante.email" placeholder="Email" id="email"/>
            <label for="celular">Celular:</label>
            <input v-model="estudiante.celular" placeholder="Celular" id="celular"/>
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
            mensaje: "",
            estudianteCargado: false
        };
    },
    methods: {
        // Buscar estudiante por ID
        async buscarEstudiante() {
            this.mensaje = "Buscando...";

            try {
                this.estudiante = await facadeIdEstudiantes(this.id);
                this.mensaje = "Estudiante cargado. Puedes editarlo.";
                this.estudianteCargado = true;
            } catch (error) {
                this.mensaje = "No se encontró el estudiante con ese ID.";
                this.estudianteCargado = false;
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
            this.estudianteCargado = false;
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
  background-color:#4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  gap: 10px;
  margin-left: 10px;
  width: auto;
}
.p {
  font-weight: bold;
  margin-top: 10px;
}
label {
  font-weight: bold;
  display: flex;
  
}
</style>