<template>
  <div class="content">
    <iframe :src="src" style="border:0;width:100%;height:100%"></iframe>
  </div>
</template>

<script>

export default {
  data () {
    return {
      src: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      try {
        const subdomain = document.location.host.split('.')[0]
        const twitter = await this.$subdomain.init(subdomain)
        this.src = `https://harmony.one/#${twitter || 'stse'}=1`
      } catch (e) {
        this.src = 'https://harmony.one/#stse=1'
      }

      console.log('Loading', this.src)
    }
  }
}
</script>