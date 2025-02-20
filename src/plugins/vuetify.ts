import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const light: ThemeDefinition = {
  dark: false,
  colors: {
    compyPrimary: "#555078",
    compyText: "#433f59",
    compyTextWhite: "#FEFEFE",
    compyBackground: "#f6f7fb",
    compyBackgroundHover: "#e0e2f0",
    compyBackgroundSecondary: "#685f9d",
    compyWhite: "#FEFEFE",
    compyGrey: "#d3d3d3",
    compyRed: "#f54436",
    compyGreen: "#4baf4f",
    compyBlue: "#4169E1",
    compyPink: "#FF007F",
    compyAmber: "#ffb300",
    compy42: "#1490a4",
    compy43: "#6A8E3F",
    compy44: "#EA9558",
    compy45: "#F2D688",
    compy46: "#2C7F6E",
    compyLearner: "#1490a4",
    compyTrainer: "#ea9558",
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    compyPrimary: "#433f59",
    compyText: "#FEFEFE",
    compyTextWhite: "#FEFEFE",
    compyBackground: "#161618",
    compyBackgroundHover: "#131315",
    compyBackgroundSecondary: "#463E67",
    compyWhite: "#121212",
    compyGrey: "#A9A9A9",
    compyRed: "#B30000",
    compyGreen: "#007F00",
    compyBlue: "#1A478C",
    compyPink: "#A6004C",
    compyAmber: "#9D7E00",
    compy42: "#0D6B7C",
    compy43: "#596D1D",
    compy44: "#B46441",
    compy45: "#B4A973",
    compy46: "#2C7F6E",
    compyLearner: "#0D6B7C",
    compyTrainer: "#A4563D",
  },
};

export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: "light",
    themes: { light, dark },
  },
});
