<template>
    <div class="container">
        <h1>Crear Curso</h1>
        <form @submit.prevent="guardar">
            <div>
                <label>Código:</label>
                <input v-model="curso.codigo" type="text" required />
            </div>
            <div>
                <label>Nombre:</label>
                <input v-model="curso.nombre" type="text" required />
            </div>
            <div>
                <label>Descripción:</label>
                <input v-model="curso.descripcion" type="text" required />
            </div>
            <div>
                <label>Profesor:</label>
                <input v-model="curso.profesor" type="text" required />
            </div>
            <button type="submit">Guardar</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import { facadeGuardarCursos } from '../clients/AcademiaClient'
export default {
    data() {
        return {
            curso: {
                codigo: '',
                nombre: '',
                descripcion: '',
                profesor: ''
            },
            message: '',
        }
    },
    methods: {
        limpiarFormulario() {
            this.curso = {
                codigo: '',
                nombre: '',
                descripcion: '',
                profesor: '',
                message: ''
            }
        },
        async guardar() {
            try {
                const body = {
                    codigo: this.curso.codigo,
                    nombre: this.curso.nombre,
                    descripcion: this.curso.descripcion,
                    profesor: this.curso.profesor
                }
                await facadeGuardarCursos(body)
                this.message = 'Curso creado correctamente.'
                this.limpiarFormulario()
            } catch (error) {
                this.message = 'Error al crear el curso.'
            }
        }
    }

}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
}

form div {
    margin-bottom: 15px;
}

label {
    /*ocupa toda la linea */
    display: flex;
    /*espacio entre el label y el input */
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