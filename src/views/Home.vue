<template>
  <div class="home">
    <h1>Gestión de Vehículos y Categorías</h1>

    <!-- Sección de Gestión de Vehículos -->
    <div class="section">
      <h2>Gestión de Vehículos</h2>
      
      <!-- Lista de Vehículos -->
      <table v-if="vehiculos.length > 0">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehiculo in vehiculos" :key="vehiculo.id">
            <td>{{ vehiculo.marca }}</td>
            <td>{{ vehiculo.modelo }}</td>
            <td>{{ getCategoriaNombre(vehiculo.categoriaId) }}</td>
            <td>
              <button @click="editVehiculo(vehiculo.id)">Editar</button>
              <button @click="deleteVehiculo(vehiculo.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mensaje si no hay vehículos -->
      <p v-else>No se encontraron vehículos.</p>

      <!-- Botones para agregar un nuevo vehículo -->
      <router-link to="/vehiculos/nuevo">
        <button class="btn">Agregar Vehículo</button>
      </router-link>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const vehiculos = ref([]);
    const categorias = ref([]);
    const router = useRouter();

    // Obtener vehículos y categorías desde el backend
    onMounted(async () => {
      const vehiculosResponse = await axios.get('http://localhost:3000/vehiculos');
      vehiculos.value = vehiculosResponse.data;

      const categoriasResponse = await axios.get('http://localhost:3000/categorias');
      categorias.value = categoriasResponse.data;
    });

    // Obtener el nombre de la categoría de un vehículo
    const getCategoriaNombre = (categoriaId) => {
      const categoria = categorias.value.find(cat => cat.id === categoriaId);
      return categoria ? categoria.nombre : 'Desconocida';
    };

    // Redirigir a la página de edición de vehículo
    const editVehiculo = (id) => {
      router.push(`/vehiculos/${id}`);
    };

    // Eliminar un vehículo
    const deleteVehiculo = async (id) => {
      if (window.confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
        await axios.delete(`http://localhost:3000/vehiculos/${id}`);
        vehiculos.value = vehiculos.value.filter(vehiculo => vehiculo.id !== id);
      }
    };

    return {
      vehiculos,
      categorias,
      getCategoriaNombre,
      editVehiculo,
      deleteVehiculo
    };
  }
};
</script>

<style scoped>
.home {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.section {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
  font-size: 1rem;
  color: #555;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button {
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: #42b983;
  color: white;
}

button:hover {
  background-color: #365e48;
}

button:active {
  background-color: #3c6e46;
}

.btn {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: #42b983;
  color: white;
  margin-top: 10px;
}

.btn:hover {
  background-color: #365e48;
}
</style>
