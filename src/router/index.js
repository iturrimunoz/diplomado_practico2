import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VehiculoList from '../components/VehiculoList.vue';
import VehiculoForm from '../components/VehiculoForm.vue';
import CategoriaList from '../components/CategoriaList.vue';
import CategoriaForm from '../components/CategoriaForm.vue';

const routes = [
  { path: '/', component: Home },  // Página de inicio
  { path: '/vehiculos', component: VehiculoList },  // Listado de vehículos
  { path: '/vehiculos/nuevo', component: VehiculoForm },  // Crear vehículo
  { path: '/vehiculos/:id', component: VehiculoForm },  // Editar vehículo
  { path: '/categorias', component: CategoriaList },  // Listado de categorías
  { path: '/categorias/nueva', component: CategoriaForm },  // Crear categoría
  { path: '/categorias/:id', component: CategoriaForm },  // Editar categoría
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;  

