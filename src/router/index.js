import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoggingView from '@/views/LoggingView.vue'
import ReporteCursosView from '@/views/ReporteCursosView.vue';
import ReporteEstudiantesView from '@/views/ReporteEstudiantesView.vue';
import EstudiantesMatriculadosView from '@/views/EstudiantesMatriculadosView.vue';

const routes = [
  {
    path:'/',
    name: 'login',
    component: LoggingView
  },
   {
    path: '/login',
    name: 'Login',
    component: LoggingView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      requiereAutorizacion: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta:{
      requiereAutorizacion:true
    }
  },
  {
    path:'/matricula',
    name:'matricula',
    component: ()=>import('../views/MatriculaView.vue'),
    meta:{
      requiereAutorizacion:true
    }
  },
  {
    path:'/reporte-cursos',
    name:'reporte-cursos',
    component: ReporteCursosView,
    meta:{
      requiereAutorizacion:true
    }
  },
  {
    path:'/reporte-estudiantes',
    name:'reporte-estudiantes',
    component: ReporteEstudiantesView,
    meta:{
      requiereAutorizacion:true
    }
  },
  {
    path:'/estudiantes-matriculados',
    name:'estudiantes-matriculados',
    component: EstudiantesMatriculadosView,
    meta:{
      requiereAutorizacion:true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//guardian
router.beforeEach((to, from, next)=>{
  if(to.meta.requiereAutorizacion){
    const estaAutenticado = localStorage.getItem("estaAutenticado");
    const token = localStorage.getItem('token');
    if(!estaAutenticado){
      next({name:'Login'})
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router
