<template>
    <div class="vehicullo-list">
      <h2>Vehículos</h2>
      <button @click="createNewVehiculo">Nuevo Vehículo</button>
      <input v-model="searchQuery" placeholder="Buscar vehículos" />
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehiculo in filteredVehiculos" :key="vehiculo.id">
            <td>{{ vehiculo.marca }}</td>
            <td>{{ vehiculo.modelo }}</td>
            <td>{{ getCategoriaName(vehiculo.categoriaId) }}</td>
            <td>
              <button @click="editVehiculo(vehiculo)">Editar</button>
              <button @click="deleteVehiculo(vehiculo.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    data() {
      return {
        vehiculos: [],
        categorias: [],
        searchQuery: '',
      };
    },
    computed: {
      filteredVehiculos() {
        return this.vehiculos.filter(vehiculo =>
          vehiculo.marca.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          vehiculo.modelo.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchData() {
        const vehiculosResponse = await axios.get('http://localhost:3000/vehiculos');
        const categoriasResponse = await axios.get('http://localhost:3000/categorias');
        this.vehiculos = vehiculosResponse.data;
        this.categorias = categoriasResponse.data;
      },
      createNewVehiculo() {
        this.$router.push({ name: 'vehiculo-form' });
      },
      editVehiculo(vehiculo) {
        this.$router.push({ name: 'vehiculo-form', params: { id: vehiculo.id } });
      },
      async deleteVehiculo(id) {
        await axios.delete(`http://localhost:3000/vehiculos/${id}`);
        this.fetchData();
      },
      getCategoriaName(categoriaId) {
        const categoria = this.categorias.find(cat => cat.id === categoriaId);
        return categoria ? categoria.nombre : '';
      },
    },
    onMounted() {
      this.fetchData();
    },
  };
  </script>
  