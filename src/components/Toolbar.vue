<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="colorPickerVisible = !colorPickerVisible" icon>
        <v-icon>mdi-palette</v-icon>
      </v-btn>
      <v-btn @click="isdark = !isdark" icon>
        <v-icon>mdi-brightness-4</v-icon>
      </v-btn>
    </v-app-bar>

    <v-dialog
      v-model="colorPickerVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="colorPickerVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Theme picker</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text @click="colorPickerVisible = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container fluid>
          <v-row align-content="center">
            <v-col sm="12" md="6">
              <v-container fluid>
                <v-row align-content="center">
                  <v-col cols="12">
                    <div class="display-3">Primary Color</div>
                  </v-col>
                  <v-col cols="12">
                    <v-color-picker
                      v-if="isdark"
                      v-model="theme.darkPrimary"
                      swatches-max-height="300"
                      :hide-canvas="true"
                      :hide-inputs="true"
                      :hide-mode-switch="true"
                      mode.sync="hexa"
                      :show-swatches="true"
                      style="display: inline-block;"
                    ></v-color-picker>
                    <v-color-picker
                      v-else
                      v-model="theme.lightPrimary"
                      swatches-max-height="300"
                      :hide-canvas="true"
                      :hide-inputs="true"
                      :hide-mode-switch="true"
                      mode.sync="hexa"
                      :show-swatches="true"
                      style="display: inline-block;"
                    ></v-color-picker>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col sm="12" md="6">
              <v-container fluid>
                <v-row align-content="center">
                  <v-col cols="12">
                    <div class="display-3">Secondary Color</div>
                  </v-col>
                  <v-col cols="12">
                    <v-color-picker
                      v-if="isdark"
                      v-model="theme.darkSecondary"
                      swatches-max-height="300"
                      :hide-canvas="true"
                      :hide-inputs="true"
                      :hide-mode-switch="true"
                      mode.sync="hexa"
                      :show-swatches="true"
                      style="display: inline-block;"
                    ></v-color-picker>
                    <v-color-picker
                      v-else
                      v-model="theme.lightSecondary"
                      swatches-max-height="300"
                      :hide-canvas="true"
                      :hide-inputs="true"
                      :hide-mode-switch="true"
                      mode.sync="hexa"
                      :show-swatches="true"
                      style="display: inline-block;"
                    ></v-color-picker>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    title: { type: String }
  },
  created() {
    this.isdark = JSON.parse(localStorage.getItem("isdark"));

    this.theme = {
      lightPrimary: localStorage.getItem("lightPrimary"),
      lightSecondary: localStorage.getItem("lightSecondary"),
      darkPrimary: localStorage.getItem("darkPrimary"),
      darkSecondary: localStorage.getItem("darkSecondary")
    };
    this.$vuetify.theme.themes.light.primary = this.theme.lightPrimary;
    this.$vuetify.theme.themes.light.secondary = this.theme.lightSecondary;
    this.$vuetify.theme.themes.dark.primary = this.theme.darkPrimary;
    this.$vuetify.theme.themes.dark.secondary = this.theme.darkSecondary;
  },
  data() {
    return {
      colorPickerVisible: false,
      isdark: false,
      theme: {
        lightPrimary: "#000000",
        lightSecondary: "#000000",
        darkPrimary: "#000000",
        darkSecondary: "#000000"
      }
    };
  },
  watch: {
    theme: {
      handler(value) {
        console.log(value);
        this.$vuetify.theme.themes.dark.primary = value.darkPrimary.substr(0, 7);
        this.$vuetify.theme.themes.dark.secondary = value.darkSecondary.substr(0, 7);

        localStorage.setItem("darkPrimary", value.darkPrimary.substr(0, 7));
        localStorage.setItem("darkSecondary", value.darkSecondary.substr(0, 7));

        this.$vuetify.theme.themes.light.primary = value.lightPrimary.substr(0, 7);
        this.$vuetify.theme.themes.light.secondary = value.lightSecondary.substr(0, 7);

        localStorage.setItem("lightPrimary", value.lightPrimary.substr(0, 7));
        localStorage.setItem(
          "lightSecondary",
          value.lightSecondary.substr(0, 7)
        );
      },
      deep: true
    },
    isdark: {
      handler(value) {
        localStorage.setItem("isdark", value);
        this.$vuetify.theme.dark = this.isdark;
      }
    }
  }
};
</script>
