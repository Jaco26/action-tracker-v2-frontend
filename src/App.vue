<template>
  <v-app>
    <TheNavbar />
    <v-content>
      <v-container fluid full-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/navbar/the-navbar'
export default {
  name: 'App',
  components: {
    TheNavbar
  },
  data: () => ({
    //
  }),
};
</script>
