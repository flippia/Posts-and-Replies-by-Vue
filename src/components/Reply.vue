<template>
  <form className="make-a-reply" @submit="submitHandler">
    <div className="header">
      <label>Replier Name:</label>
      <input v-model="author" type="text" required />
      <label>Replier Email:</label>
      <input v-model="email" type="text" required />
      <button @click="submitHandler">Reply</button>
    </div>
    <textarea
      v-model="body"
      required
      placeholder="Please input here"
    ></textarea>
  </form>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      author: "",
      email: "",
      body: "",
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      const reply = {
        authorName: this.author,
        authorEmail: this.email,
        freeTextArea: this.body,
        postID: Number(this.id),
      };
      if (this.author !== "" && this.email !== "" && this.body !== "") {
        fetch("https://intense-waters-27320.herokuapp.com/replies/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reply),
        }).then(() => {
          this.author = "";
          this.email = "";
          this.body = "";
          this.updateReplies();
        });
      }
    },
    updateReplies() {
      this.$emit("update");
    },
  },
};
</script>

<style>
.make-a-reply {
  border: 0.05rem solid #f2f2f2;
  padding: 0.8rem;
  border-radius: 0.5rem;
  margin: 0.5rem 1rem 0 1rem;
}

.make-a-reply .header {
  display: flex;
  align-items: center;
}

.make-a-reply .header input {
  height: 1rem;
  padding: 0.4rem;
  margin: 0 2rem 0 0.3rem;
}

.make-a-reply textarea {
  margin-top: 0.8rem;
  width: 99%;
}

.make-a-reply button {
  font-size: 1rem;
  margin-top: auto;
  margin-left: auto;
  background-color: antiquewhite;
  border: 0;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 200ms;
}

.make-a-reply button:hover {
  background: #f1356d;
  color: #fff;
}
</style>
