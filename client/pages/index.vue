<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        expense-tracker
      </h1>
      <h2 class="subtitle">
        a simple app to track your expense
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
      <form @submit.prevent="onSubmit">
        <label for="message">Enter message:</label>
        <input id="message" v-model="message" type="text">
        <label for="value">Enter value:</label>
        <input id="value" v-model="value" type="text">
        <button>Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  components: {
    Logo
  },
  data() {
    return {
      message: '',
      value: ''
    }
  },
  methods: {
    onSubmit() {
      axios
        .post('/api/expense', {
          message: this.message,
          value: this.value
        })
        .then(response => alert(JSON.stringify(response)))
        .catch(error => alert(error))
      // console.log(this.$sxios)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
