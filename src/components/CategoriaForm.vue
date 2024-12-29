<template>
    <div class="categoria-form">
      <h2>{{ categoria.id ? 'Editar Categoría' : 'Nueva Categoría' }}</h2>
  
      <!-- Formulario para agregar o editar categoría -->
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            v-model="categoria.nombre"
            required
            placeholder="Ej: SUV"
          />
        </div>
  
        <div class="form-actions">
          <button type="submit">{{ categoria.id ? 'Actualizar' : 'Crear' }} Categoría</button>
          <button type="button" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'CategoriaForm',
    setup() {
      const categoria = ref({ nombre: '' });
      const route = useRoute();
      const router = useRouter();
  
      // Si estamos editando, obtenemos la categoría por ID
      onMounted(async () => {
        if (route.params.id) {
          const categoriaId = route.params.id;
          const response = await axios.get(`http://localhost:3000/categorias/${categoriaId}`);
          categoria.value = response.data;
        }
      });
  
      // Enviar el formulario
      const submitForm = async () => {
        if (categoria.value.id) {
          // Si tiene ID, actualizar la categoría
          await axios.put(`http://localhost:3000/categorias/${categoria.value.id}`, categoria.value);
        } else {
          // Si no tiene ID, es una nueva categoría
          await axios.post('http://localhost:3000/categorias', categoria.value);
        }
        router.push('/categorias');  // Redirigir a la lista de categorías
      };
  
      // Cancelar y volver a la lista
      const cancelar = () => {
        router.push('/categorias');  // Redirigir a la lista de categorías sin hacer cambios
      };
  
      return {
        categoria,
        submitForm,
        cancelar
      };
    }
  };
  </script>
  
  <style scoped>
  .categoria-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    font-size: 1rem;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #42b983;
    color: white;
  }
  
  button:hover {
    background-color: #365e48;
  }
  
  button[type="button"] {
    background-color: #ccc;
    margin-left: 10px;
  }
  
  button[type="button"]:hover {
    background-color: #bbb;
  }
  </style>
  