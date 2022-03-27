import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },

      "*": {
        margin: "0",
      },

      "#root,html, body": {
        height: "100%",
      },

      html: {
        fontSize: "1.2em",
      },

      body: {
        lineHeight: 1.5,
        webkitFontSmoothing: "antialiased",
        background: "primary",
      },

      main: {
        position: "relative",
      },

      "img, picture, video, canvas, svg": {
        display: "block",
        maxInlineSize: "100%",
      },

      "input, button, textarea, select ": {
        font: "inherit",
      },

      "p, h1, h2, h3, h4, h5, h6": {
        overflowWrap: "break-word",
      },

      "#root, #__next": {
        isolation: "isolate",
      },
    },
  },
});
