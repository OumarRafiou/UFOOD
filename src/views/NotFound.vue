<!--Should be useless since the router should redirect on 404,
  but just in case something happens I'll leave there-->
<template>
  <div>
    <h1>Page Not Found</h1>
    <p>We're sorry, but the page you requested could not be found.</p>
    <router-link :to="{ name: 'Home' }">Return to Home Page</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
</style>
