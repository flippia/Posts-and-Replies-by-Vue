<template>
  <div class="nav">
    <router-link :to="{ name: 'Posts' }">Posts List</router-link> |
    <router-link :to="{ name: 'Create' }">Create A Post</router-link>
    <!-- <a href="/about">About</a> -->
  </div>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

/* base styles */
* {
  margin: 0;
  font-family: "Quicksand";
  color: #333;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav {
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 4rem;
  border-bottom: 0.1rem solid #f2f2f2;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  background: white;  
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 0.5rem;
}

.nav a.router-link-exact-active {
  background-color: #f1356d;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>
