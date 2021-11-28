<template>
  <div class="create-post">
    <h2>Add a New Post</h2>
    <form @submit="handleSubmit">
      <label>Author Name:</label>
      <input type="text" v-model="name" required />
      <label>Author Email:</label>
      <input type="text" v-model="email" required />
      <label>Text Area:</label>
      <textarea v-model="body" required></textarea>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      name: "",
      email: "",
      body: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const post = {
        authorName: this.name,
        authorEmail: this.email,
        freeTextArea: this.body,
      };

      fetch("http://localhost:8000/posts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      }).then(() => this.redirect());
    },
    redirect() {
      this.$router.push({ name: "Posts" });
    },
  },
};
</script>

<style scoped>
.create-post {
  max-width: 40%;
  margin: 2rem auto;
  text-align: center;
  margin-top: 9rem;
}

.create-post label {
  text-align: left;
  display: block;
}

.create-post h2 {
  font-size: 1.5rem;
  color: #f1356d;
  margin-bottom: 30px;
}

.create-post input,
.create-post textarea,
.create-post select {
  width: 100%;
  padding: 0.5rem;
  margin: 0.4rem 0 1rem 0;
  border: 0.05rem solid #ddd;
  box-sizing: border-box;
  display: block;
}

.create-post button {
  font-size: 1.3rem;
  margin: 1rem;
  background-color: antiquewhite;
  border: 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 200ms;
}

.create-post button:hover {
  background: #f1356d;
  color: #fff;
}
</style>
