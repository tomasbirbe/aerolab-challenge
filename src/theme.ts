import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
  },
  semanticTokens: {
    colors: {
      hoverColor: "linear-gradient(0deg, rgba(67,197,243,0.8) 46%, rgba(46,218,251,0.8) 100%)",
      primary: {
        default: "#0ad4fa",
      },
      primaryHover: "#05C6ED",
      primaryActive: "#04B7DA",

      text: {
        default: "#fff",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        bg: "primary",
        color: "white",
        _hover: {
          bg: "primaryHover",
        },
        _active: {
          bg: "primaryActive",
        },
      },
      variants: {
        redeem: {
          _active: { bg: "gray.300" },
          _disabled: { opacity: 0.7 },
          _hover: { bg: "gray.200" },
          bg: "white",
          borderRadius: "full",
          textColor: "blackAlpha.700",
          width: "80%",
        },
        confirmRedeem: {
          _disabled: { opacity: 0.7 },
          bg: "green.400",
          _hover: { bg: "green.500" },
          _active: { bg: "green.600" },
          borderRadius: "full",
          textColor: "white",
          width: "80%",
        },
      },
      defaultProps: {
        variant: null,
      },
    },
  },
  styles: {
    global: {
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },

      "*": {
        margin: "0",
      },

      option: {
        color: "black",
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
        overflow: "hidden",
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

      "#root": {
        isolation: "isolate",
        overflow: "auto",
        scrollBehavior: "smooth",
      },
      "::-webkit-scrollbar": { width: "5px" },
      "::-webkit-scrollbar-thumb": { bg: "primary", borderRadius: "2px" },
    },
  },
});
