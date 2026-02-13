<template>
  <header class="header-academia">
    <div class="logo-titulo">
      <h1>Academia de Cursos</h1>
    </div>
    <button class="btn-logout" @click="logout">Cerrar Sesión</button>
  </header>
  <div class="container">
    <nav>
      <router-link to="/reporte-cursos">Reporte Cursos</router-link>|
      <router-link to="/reporte-estudiantes"> Reporte Estudiantes</router-link>|
      <router-link to="/matricula">Matricula</router-link>|
      <router-link to="/estudiantes-matriculados">Estudiantes Matriculados</router-link>|
      <router-link to="/actualizar-curso">Actualizar Curso</router-link>|
      <router-link to="/actualizar-estudiante">Actualizar Estudiante</router-link>|
      <router-link to="/guardar-estudiante">Crear Estudiante</router-link>|
      <router-link to="/guardar-curso">Crear Curso</router-link>
      
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("estaAutenticado");
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.header-academia {
  display: flex;
  justify-content: space-between; /* Empuja el título a la izquierda y el botón a la derecha */
  align-items: center;
  padding: 10px 40px;
  background-color: #f8f9fa; /* Un fondo sutil  */
}

.logo-titulo h1 {
  margin-left: 500px; /* Espacio entre el borde y el título */
}
.btn-logout {
  padding: 8px 15px;
  background-color: #e74c3c; /* Un rojo suave es común para "salir" o "borrar" */
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 0.9rem;
}
</style>
