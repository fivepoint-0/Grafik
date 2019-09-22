<template>
  <v-app>
    <Toolbar :title="appName" app />
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "App",
  components: {
    Toolbar
  },
  created() {
    
  },
  data() {
    return {
      appName: "P5Sketches",      
    };
  },
  methods: {
    toggleTheme: function() {
      this.isdark = !this.isdark;
      localStorage.setItem("isdark", this.isdark);
      this.$vuetify.theme.dark = this.isdark;
    }
  }
};
</script>
<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(37, 37, 37);
  border-radius: 2.5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(203, 203, 203);
  border-radius: 2.5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #6fc055;
}
</style>