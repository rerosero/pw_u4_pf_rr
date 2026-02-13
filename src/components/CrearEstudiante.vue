<template>
    <div class="crear-estudiante">
        <h2>Crear Estudiante</h2>
        <form @submit.prevent="submit">
            <div class="campo">
                <label>Nombre</label>
                <input v-model="estudiante.nombre" required />
            </div>

            <div class="campo">
                <label>Apellido</label>
                <input v-model="estudiante.apellido" required />
            </div>

            <div class="campo">
                <label>Email</label>
                <input v-model="estudiante.email" type="email" required />
            </div>

            <div class="campo">
                <label>Celular</label>
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
    max-width: 380px;
    /* más angosto */
    margin: 30px auto;
    /* menos espacio arriba */
    padding: 18px;
    /* menos padding */
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

h2 {
    text-align: center;
    margin-bottom: 15px;
    font-size: 18px;
    /* título más pequeño */
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* menos espacio entre campos */
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

label {
    font-size: 13px;
    /* más pequeño */
    font-weight: 600;
    color: #444;
}

input {
    padding: 7px;
    /* menos alto */
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 13px;
    transition: 0.2s ease;
}

input:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 3px rgba(46, 125, 50, 0.3);
}

button {
    margin-top: 8px;
    padding: 8px;
    border-radius: 5px;
    border: none;
    background-color: #2e7d32;
    color: white;
    font-size: 14px;
    /* botón más pequeño */
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
}

button:hover {
    background-color: #1b5e20;
}

p {
    margin-top: 10px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
}
</style>
