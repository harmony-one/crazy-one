<template>
  <div class="content">
    <div v-if="address" class="address">
      Owner: {{ address }}
    </div>
    <iframe :src="src" style="border:0;width:100%;height:100%" />
  </div>
</template>

<script>

export default {
  data () {
    return {
      url: 'https://harmony.one',
      // url: 'about:blank',
      src: '',
      address: null
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

        if (twitter) {
          this.src = `${this.url}/#${twitter}=1`
        } else {
          this.address = await this.$subdomain.getAddress(subdomain)
          this.src = this.url
        }
      } catch (e) {
        this.src = this.url
      }

      console.log('Loading', this.src)
    }
  }
}
</script>