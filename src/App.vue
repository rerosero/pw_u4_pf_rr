<template>
  <header class="header-academia">
    <div class="logo-titulo">
      <h1>Academia de Cursos</h1>
    </div>
    <button v-if="estaLogueado || esInvitado" class="btn-logout" @click="logout">Cerrar Sesión</button>
  </header>
  <div class="container">
    <nav class="navbar" v-if="$route.path !== '/'">
      <!-- Disponible para todos (Invitado y Admin) -->
      <router-link to="/reporte-cursos">Reporte Cursos</router-link>
      <router-link to="/reporte-estudiantes">Reporte Estudiantes</router-link>

      <!-- Disponible solo para Admin (Token) -->
      <template v-if="estaLogueado">
        <router-link to="/matricula">Matricula</router-link>
        <router-link to="/estudiantes-matriculados">Estudiantes Matriculados</router-link>
        <router-link to="/actualizar-curso">Actualizar Curso</router-link>
        <router-link to="/actualizar-estudiante">Actualizar Estudiante</router-link>
        <router-link to="/guardar-estudiante">Crear Estudiante</router-link>
        <router-link to="/guardar-curso">Crear Curso</router-link>
      </template>
    </nav>
    <main>
      <router-view />
    </main>
  </div>

</template>

<script>
export default {
  data() {
    return {
      estaLogueado: false, // bandera para saber si mostrar botón
      esInvitado: false
    }
  },

  mounted() {
    // Se ejecuta cuando el componente carga
    this.verificarLogin();
  },

  methods: {
    verificarLogin() {
      // Revisamos si hay token en localStorage
      this.estaLogueado = !!localStorage.getItem("token");
      this.esInvitado = localStorage.getItem("esInvitado") === 'true';
    },

    logout() {
      localStorage.removeItem("estaAutenticado");
      localStorage.removeItem("token");
      localStorage.removeItem("esInvitado");
      this.estaLogueado = false; // ocultar botón al cerrar sesión
      this.esInvitado = false;
      this.$router.push({ name: "login" });
    }
  },
  watch: {
    $route() {
      this.verificarLogin();
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

.container {
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* Barra de navegación */
.navbar {
  display: flex;
  flex-wrap: wrap;
  /* permite que baje en pantallas pequeñas */
  justify-content: center;
  gap: 12px;
  background-color: #ffffff;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

/* Links */
.navbar a {
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  color: #2c3e50;
  background-color: #f2f2f2;
  transition: all 0.3s ease;
}

/* Hover */
.navbar a:hover {
  background-color: #4caf50;
  color: white;
  transform: translateY(-2px);
}

/* Link activo */
.navbar a.router-link-exact-active {
  background-color: #2e7d32;
  color: white;
}


.header-academia {
  display: flex;
  justify-content: space-between;
  /* Empuja el título a la izquierda y el botón a la derecha */
  align-items: center;
  padding: 10px 40px;
  background-color: #f8f9fa;
  /* Un fondo sutil  */
}

.logo-titulo h1 {
  margin-left: 500px;
  /* Espacio entre el borde y el título */
}

.btn-logout {
  padding: 8px 15px;
  background-color: #e74c3c;
  /* Un rojo suave es común para "salir" o "borrar" */
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 0.9rem;
}
</style>
