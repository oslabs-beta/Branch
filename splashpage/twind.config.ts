import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    minHeight: {
      '1/2': '50%',
      '1/4': '25%'
    },
    extend: {
      fontFamily: {
        'comp': ["Saira"]
      }
      colors: {
        'green':'#3f5e3c',
        'light-green':'#b7c5b7',
        'tan':'#eee5d5',
        'branch':'#b78b54',
        'off-white': "#dde6dc",
        'white' : '#ffffff',
        'dark' : '#0b1c09'
      }
    }
  }
} as Options;
