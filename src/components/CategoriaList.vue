<template>
  <div class="categoria-list">
    <h1>Lista de Categorías</h1>

    <!-- Botón para agregar nueva categoría -->
    <router-link to="/categorias/nueva">
      <button>Agregar Categoría</button>
    </router-link>

    <!-- Tabla de categorías -->
    <table v-if="categorias.length > 0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.nombre }}</td>
          <td>
            <button @click="editCategoria(categoria.id)">Editar</button>
            <button @click="deleteCategoria(categoria.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No se encontraron categorías.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'CategoriaList',
  setup() {
    const categorias = ref([]);
    const router = useRouter();

    // Obtener las categorías desde el backend
    onMounted(async () => {
      const response = await axios.get('http://localhost:3000/categorias');
      categorias.value = response.data;
    });

    // Redirigir a la página de edición de categoría
    const editCategoria = (id) => {
      router.push(`/categorias/${id}`);
    };

    // Eliminar una categoría
    const deleteCategoria = async (id) => {
      if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
        await axios.delete(`http://localhost:3000/categorias/${id}`);
        categorias.value = categorias.value.filter(categoria => categoria.id !== id);
      }
    };

    return {
      categorias,
      editCategoria,
      deleteCategoria
    };
  }
};
</script>

<style scoped>
.categoria-list {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

table th, table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
