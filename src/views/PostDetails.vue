<template>
  <div class="post-details">
    <div className="post-author">
      <h3 className="content">{{ post.authorName }}</h3>
      <h4 className="content">{{ post.authorEmail }}</h4>
      <button @click="handleDelete">Delete Post</button>
    </div>
    <div className="post-body">
      <p className="content">{{ post.freeTextArea }}</p>
    </div>
    <div v-for="reply in replies" :key="reply.id" class="reply">
      <div className="reply-author">
        <h5>{{ reply.authorName }}</h5>
        <h6>{{ reply.authorEmail }}</h6>
      </div>
      <div className="reply-body">
        <p>{{ reply.freeTextArea }}</p>
      </div>
    </div>
    <Reply :id="id" @update="GetReplies" />
  </div>
</template>

<script>
import Reply from "../components/Reply.vue";

export default {
  name: "PostDetails",
  props: ["id"],
  components: { Reply },
  data() {
    return {
      // id: this.$route.params.id,
      post: [],
      replies: [],
    };
  },
  methods: {
    GetReplies() {
      fetch("https://flippia-api.herokuapp.com/replies")
        .then((res) => res.json())
        .then((data) => {
          this.replies = data.filter(
            (oneData) => oneData.postID === Number(this.id)
          );
          console.log(this.replies);
        })
        .catch((err) => console.log(err.message));
    },
    handleDelete() {
      fetch("https://flippia-api.herokuapp.com/posts/" + this.id, {
        method: "DELETE",
      })
        .then(() => {
          fetch("https://flippia-api.herokuapp.com/replies")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              data
                .filter((replies) => replies.postID === Number(this.id))
                .forEach((reply) => {
                  fetch("https://flippia-api.herokuapp.com/replies/" + reply.id, {
                    method: "DELETE",
                  });
                });
            });
        })
        .then(() => {
          this.$router.push({ name: "Posts" });
        });
    },
  },
  mounted() {
    fetch(`https://flippia-api.herokuapp.com/posts/${this.id}`)
      .then((res) => res.json())
      .then((data) => (this.post = data))
      .catch((err) => console.log(err.message));

    this.GetReplies();
  },
};
</script>

<style>
.post-details {
  padding: 2rem;
  margin: auto;
  margin-top: 6rem;
}
.post-author {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

h3 {
  font-size: 1.3rem;
  color: #f1356d;
  margin: 0 0.5rem 0.5rem 0;
}

h4 {
  margin: 0 0.5rem 0.5rem 0;
}

.post-details button {
  font-size: 1rem;
  margin-left: auto;
  margin-right: 1rem;
  background-color: antiquewhite;
  border: 0;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 200ms;
}

.post-details button:hover {
  background: #f1356d;
  color: #fff;
}

.post-body {
  margin-bottom: 0.8rem;
}

.reply {
  background-color: #f2f2f2;
  border-radius: 0.5rem;
  margin: 0.4rem 1rem 0 1rem;
  padding: 0.5rem;
}

.reply .reply-author {
  display: flex;
  align-items: center;
}

.reply .reply-author h5 {
  font-size: 1rem;
  color: #f1356d;
  margin: 0 0.5rem 0.5rem 0;
}

.reply .reply-author h6 {
  font-size: 0.8rem;
  margin: 0 0.5rem 0.5rem 0;
}
</style>