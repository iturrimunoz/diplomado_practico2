<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/categorias">Categorías</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav ul {
  list-style-type: none;
  
  padding: 0;
  display: flex;
  gap: 1rem;
}

nav ul li {
  display: inline;
}
</style>
