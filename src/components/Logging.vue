<template>
  <div class="container">
    <h1>Iniciar Sesión</h1>
    <input v-model="user" type="text" placeholder="user">
    <input v-model="password" type="password" placeholder="password">
    <button @click="login">Login</button>
    <p class="error">{{ mensaje }}</p>
    <p class="exito">{{ exito }}</p>
  </div>
</template>

<script>
import {facadeObtenerUsuario} from '../clients/AuthorizationClient'
export default {
    data(){
        return{
            user:'',
            password:'',
            mensaje:'',
            exito:'',
            timer: null
        }
    }, methods:{
        limpiar(){
            this.user='',
            this.password='',
            this.mensaje='',
            this.exito=''
        },
        async login(){
            //limpiar el tiempo previo si existe
            if(this.timer) clearTimeout(this.timer)
            if(!this.user || !this.password){
                this.mensaje="Usuario o cantraseña vacios";
                this.timer=setTimeout(this.limpiar,3000);
                return;
            }
            try{
                const resultado = await facadeObtenerUsuario(this.user, this.password);
                this.exito="Se a iniciado sesión de manera exitosa";
                localStorage.setItem('token',resultado.accessToken);
                localStorage.setItem('estaAutenticado', true);
                // aquí se podria redirigir
                // Redirigir a Home
                localStorage.setItem('user',this.user)
                this.$router.push({ name: 'reporte-cursos' });
            }catch(er){
                this.mensaje="Las credenciales no son correctas"
                this.timer=setTimeout(this.limpiar,3000);
            }
            
        }
    }
}
</script>

<style scoped>
.container{
    /* ancho */
    width: 300px;
    /* espacio arriba y abajo - auto para centrar*/
    margin: 50px auto;
    /* espacio interno */
    padding: 20px;
    /*redondea el borde */
    border-radius: 10px;
    /* agrega una sombra */
    box-shadow: 2px 2px 10px;
    /* organizacion de manera flexible*/
    display: flex;
    /*los elementos se ponen de manera vertical */
    flex-direction: column;
    /* espacio entre elemento */
    gap: 10px;
    /* fondo del contenero*/
    border: 1px solid black
}
input{
    padding: 8px;
    border: 1px solid black;
    border-radius: 5px;
}
button{
    border-radius: 2px;
    width: 100px;
    padding: 8px;
    margin: 20px auto ;
    justify-content: center;
    cursor: pointer;
}
p{
    font-weight: bold;
    margin-top:10px ;
}
.error{
    color:red; 
}
.exito{
    color: green;
}
</style>