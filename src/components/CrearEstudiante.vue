<template>
    <div class="crear-estudiante">
        <h1>Crear Estudiante</h1>
        <form @submit.prevent="submit">
            <div class="campo">
                <label>Nombre:</label>
                <input v-model="estudiante.nombre" required />
            </div>

            <div class="campo">
                <label>Apellido:</label>
                <input v-model="estudiante.apellido" required />
            </div>

            <div class="campo">
                <label>Email:</label>
                <input v-model="estudiante.email" type="email" required />
            </div>

            <div class="campo">
                <label>Celular:</label>
                <input v-model="estudiante.celular" required />
            </div>

            <button type="submit">Guardar</button>
        </form>

        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
import { facadeGuardarEstudiantes } from '../clients/AcademiaClient'

export default {
    name: 'CrearEstudiante',
    data() {
        return {
            estudiante: {
                nombre: '',
                apellido: '',
                email: '',
                celular: ''
            },
            message: '',
        }
    },
    methods: {
        async submit() {
            try {
                const body = {
                    nombre: this.estudiante.nombre,
                    apellido: this.estudiante.apellido,
                    email: this.estudiante.email,
                    celular: this.estudiante.celular
                }
                await facadeGuardarEstudiantes(body)
                this.message = 'Estudiante creado correctamente.'
                this.estudiante = { nombre: '', apellido: '', email: '', celular: '' }
            } catch (error) {
                this.message = 'Error al crear el estudiante.'
            }
            finally {
                setTimeout(() => {
                    this.message = ''
                }, 1000)
            }
        }
    }
}
</script>

<style scoped>
.crear-estudiante {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
}

form div {
    margin-bottom: 15px;
}

label {
    display: flex;
    margin-bottom: 5px;
    align-items: first baseline;
    margin-left: 8%;
}

input {
    width: 500px;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
    cursor: pointer;
    width: 500px;
}

button:hover {
    background-color: #45a049;
}
</style>
