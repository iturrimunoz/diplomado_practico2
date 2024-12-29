<template>
  <div class="vehiculo-form">
    <h2>{{ vehiculo.id ? 'Editar Vehículo' : 'Nuevo Vehículo' }}</h2>

    <!-- Formulario para agregar o editar vehículo -->
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="marca">Marca</label>
        <input
          type="text"
          id="marca"
          v-model="vehiculo.marca"
          required
          placeholder="Ej: Toyota"
        />
      </div>

      <div class="form-group">
        <label for="modelo">Modelo</label>
        <input
          type="text"
          id="modelo"
          v-model="vehiculo.modelo"
          required
          placeholder="Ej: Corolla"
        />
      </div>

      <div class="form-group">
        <label for="categoria">Categoría</label>
        <select
          id="categoria"
          v-model="vehiculo.categoriaId"
          required
        >
          <option value="" disabled>Selecciona una categoría</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit">{{ vehiculo.id ? 'Actualizar' : 'Crear' }} Vehículo</button>
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
  name: 'VehiculoForm',
  props: {
    vehiculo: {
      type: Object,
      default: () => ({ marca: '', modelo: '', categoriaId: null })
    },
    categorias: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const vehiculo = ref({ ...props.vehiculo });
    const categorias = ref([...props.categorias]);
    const route = useRoute();
    const router = useRouter();

    // Si estamos editando, obtenemos el vehículo por ID
    onMounted(async () => {
      if (route.params.id) {
        const vehiculoId = route.params.id;
        const vehiculoResponse = await axios.get(`http://localhost:3000/vehiculos/${vehiculoId}`);
        vehiculo.value = vehiculoResponse.data;
      }
      
      // Obtener las categorías desde el backend
      if (categorias.value.length === 0) {
        const categoriasResponse = await axios.get('http://localhost:3000/categorias');
        categorias.value = categoriasResponse.data;
      }
    });

    const submitForm = async () => {
      if (vehiculo.value.id) {
        // Si tiene ID, actualizamos el vehículo
        await axios.put(`http://localhost:3000/vehiculos/${vehiculo.value.id}`, vehiculo.value);
      } else {
        // Si no tiene ID, es un nuevo vehículo
        await axios.post('http://localhost:3000/vehiculos', vehiculo.value);
      }
      router.push('/');  // Redirigir a la lista de vehículos
    };

    const cancelar = () => {
      router.push('/');  // Redirigir a la lista de vehículos sin hacer cambios
    };

    return {
      vehiculo,
      categorias,
      submitForm,
      cancelar
    };
  }
};
</script>

<style scoped>
.vehiculo-form {
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

input, select {
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
  transition: background-color 0.3s ease;
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
