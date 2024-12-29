<template>
  <div>
    <h1>Gestión de Vehiculos</h1>
    <CategoriaList />
  </div>
</template>

<script>
import VehiculoList from '../components/VehiculoList.vue';

export default {
  components: {
    VehiculoList,
  },
};
</script>
