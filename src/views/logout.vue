<template>
  <v-layout>
    <v-flex>
      You are being logged out
    </v-flex>
  </v-layout>
</template>

<script>
import { setInterval } from 'timers'
export default {
  async mounted() {
    // NOTE: we use location.replace() instead of $router.push() below because refreshing the page
    // takes care of cleaning up application state we don't want hanging around in the browser after
    // user logs out
    try {
      let counter = 2
      setInterval(() => {
        counter -= 1
      }, 1000)
      await this.$store.dispatch('user/LOGOUT')
      if (counter) {
        // At this point we can infer that this component has been mounted for LESS THAN 2 seconds 
        // and we have successfully logged out. Now we set a timer to reload the page on the home page
        // in 2 seconds. This is purely for look and feel---we don't want "You are being logged out" to
        // flicker real fast and then have the page immediately refresh. That's creepy.
        setTimeout(() => {
          location.replace('/')
        }, 2000)
      } else {
        // Here, we can infer, that this component has been mounted for MORE THAN 2 seconds and 
        // we have successfully logged out so we reload the page now.
        location.replace('/')
      }
    } catch (error) {
      console.error('[logout "mounted" error]', error)
    }
  }
}
</script>