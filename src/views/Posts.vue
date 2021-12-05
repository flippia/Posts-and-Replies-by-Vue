<template>
  <form class="search" @submit="handleSearch">
    <button @click="handleSearch">Search</button>
    <input type="text" v-model="search" placeholder="Please input here" />
  </form>
  <div class="posts-list">
    <div class="post-preview" v-for="post in filteredPosts" :key="post.id">
      <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">
        <div class="post-author">
          <h3 class="content">{{ post.authorName }}</h3>
          <h4 class="content">{{ post.authorEmail }}</h4>
        </div>
        <div className="post-body">
          <p className="content">{{ post.freeTextArea }}</p>
        </div>
        <div class="replies-number">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-chat-left-dots"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              v-if="replyNum[post.id - 1] !== 0"
              d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            />
          </svg>
          {{ replyNum[post.id - 1] }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      replies: [],
      replyNum: [],
      search: "",
      current: "all",
    };
  },
  methods: {
    async getData() {
      try {
        const resPosts = await fetch("https://intense-waters-27320.herokuapp.com/posts");
        this.posts = await resPosts.json();
        this.posts.forEach(() => this.replyNum.push(0));

        const resReplies = await fetch("https://intense-waters-27320.herokuapp.com/replies");
        this.replies = await resReplies.json();
        this.replies.forEach((reply) => this.replyNum[reply.postID - 1]++);
      } catch (err) {
        console.log(err);
      }
    },

    handleSearch(e) {
      e.preventDefault();
      if (this.search === "") {
        this.current = "all";
      } else {
        this.current = "search";
        const pattern = new RegExp(
          `${this.search.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&")}`,
          "gi"
        );
        const Contents = Array.from(document.querySelectorAll(".content"));

        Contents.forEach((content) => {
          content.innerHTML = content.textContent.replace(
            pattern,
            (match) =>
              `<span style="background-color: AliceBlue; font-weight: bold; text; border-radius: 0.2em; padding: 0.1em">${match}</span>`
          );
        });

      }
    },
  },
  computed: {
    filteredPosts() {
      const pattern = new RegExp(
        `${this.search.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&")}`,
        "gi"
      );
      const Contents = Array.from(document.querySelectorAll(".content"));
      if (this.current === "search") {
        Contents.forEach((content) => {
          content.innerHTML = content.textContent.replace(
            pattern,
            (match) =>
              `<span style="background-color: AliceBlue; font-weight: bold; text; border-radius: 0.2em; padding: 0.1em">${match}</span>`
          );
        });

        return this.posts.filter(
          (post) =>
            post.freeTextArea.match(pattern) ||
            post.authorName.match(pattern) ||
            post.authorEmail.match(pattern)
        );
      } else if (this.current === "all") {
        Contents.forEach((content) => {
          content.innerHTML = content.textContent.replace(
            /<\/?span[^>]*>/g,
            ""
          );
        });
        return this.posts;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.search {
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 6rem;
  z-index: 9;
  background: white;
}

.search input {
  margin: auto 0.5rem;
  font-size: 1.2rem;
}

.search button {
  font-size: 1.2rem;
  background-color: antiquewhite;
  border: 0;
  margin-right: 0.8rem;
  padding: 0.25rem 0.6rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 200ms;
}

.search button:hover {
  background: #f1356d;
  color: #fff;
}

.posts-list {
  margin-top: 11rem;
}

.post-preview {
  padding: 1rem;
  margin: 1rem;
  border-bottom: 0.1rem solid #fafafa;
}

.post-preview:hover {
  box-shadow: 0.1rem 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
}

.post-preview a {
  text-decoration: none;
  color: black;
}

.post-preview .post-author {
  display: flex;
  align-items: center;
}

.post-preview h3 {
  font-size: 1.3rem;
  color: #f1356d;
  margin: 0 0.5rem 0.5rem 0;
}

.post-preview h4 {
  margin: 0 0.5rem 0.5rem 0;
}

.post-preview .post-body {
  margin-bottom: 0.8rem;
}

.post-preview .replies-number {
  display: flex;
}

.post-preview .replies-number svg {
  margin: 0 0.5rem 0 0;
}
</style>
