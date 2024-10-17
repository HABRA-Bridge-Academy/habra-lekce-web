/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#163558",
          secondary: "#0094fa",
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'md'
  },
  defaults: {
    VCard: {
      elevation: 0,
    },
    VTextField: {
      variant: "outlined",
      border: "solid 1px #163558",
      density: "comfortable",
    },
    VSelect: {
      variant: "outlined",
    },
    VTextarea: {
      variant: "outlined",
    }
  }
});
