<template>
    <div class="container">
        <h1>Iniciar Sesión</h1>
        <label> Usuario </label>
        <input v-model="user" type="text" placeholder="Usuario">
        <label> Contraseña </label>
        <input v-model="password" type="password" placeholder="Contraseña">
        <button @click="login">Iniciar Sesión</button>
        <button @click="ingresarInvitado"> Invitado</button>
        <p class="error">{{ mensaje }}</p>
        <p class="exito">{{ exito }}</p>
    </div>
</template>


<script>
import { facadeObtenerUsuario } from '../clients/AuthorizationClient'
export default {
    data() {
        return {
            user: '',
            password: '',
            mensaje: '',
            exito: '',
            timer: null
        }
    }, methods: {
        limpiar() {
            this.user = '',
                this.password = '',
                this.mensaje = '',
                this.exito = ''
        },
        async login() {
            //limpiar el tiempo previo si existe
            if (this.timer) clearTimeout(this.timer)
            if (!this.user || !this.password) {
                this.mensaje = "Usuario o cantraseña vacios";
                this.timer = setTimeout(this.limpiar, 3000);
                return;
            }
            try {
                const resultado = await facadeObtenerUsuario(this.user, this.password);
                this.exito = "Se a iniciado sesión de manera exitosa";
                localStorage.setItem('token', resultado.accessToken);
                localStorage.setItem('estaAutenticado', true);
                // aquí se podria redirigir
                // Redirigir a Home
                localStorage.setItem('user', this.user)
                this.$router.push({ name: 'reporte-cursos' });
            } catch (er) {
                this.mensaje = "Las credenciales no son correctas"
                this.timer = setTimeout(this.limpiar, 3000);
            }

        },
        ingresarInvitado() {
            localStorage.setItem('esInvitado', 'true');
            // Remove token if any just in case
            localStorage.removeItem('token');
            localStorage.removeItem('estaAutenticado');
            // Redirect to reports
            this.$router.push({ name: 'reporte-cursos' });
        }

    }
}
</script>
<style scoped>
.container {
    width: 350px;
    margin: 80px auto;
    padding: 30px 25px;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-family: 'Arial', sans-serif;
    text-align: center;
}

h1 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.8rem;
}

input {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    transition: all 0.3s ease;

}

input:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 0;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

p {
    font-weight: 600;
    margin-top: 5px;
    font-size: 0.95rem;
}

.error {
    color: #e74c3c;
}

.exito {
    color: #27ae60;
}

label {
    display: flex;
    margin-left: 2%;
}
</style>