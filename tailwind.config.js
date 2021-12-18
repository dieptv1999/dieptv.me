module.exports = {
  mode: 'jit',
  important: true,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      marginTop: {
        "m-head": "70px"
      },
      maxWidth: {
        "xs": "550px",
        "xxs": "8rem",
        "32": "8rem",
      },
      minWidth: {
        "menu": "190px",
        "filter": "250px"
      },
      minHeight: {
        "xs": "300px",
      },
      height: {
        xs: "586px",
        "112": "28rem",
        "128": "32rem",
        "4/5": "80%",
        "navbar": "74px",
        "60vh": '60vh',
        "80vh": "80vh",
        "75vh": '75vh',
        "70vh": "70vh",
        "fit": "fit-content",
      },
      width: {
        "btn": "167px",
        "filter-activity": "350px",
        "fit": "fit-content",
        "card-popover": "330px",
      },
      textColor: {
        "navy-blue": "rgb(32, 129, 226)",
        "regal-blue": "rgb(24, 104, 183)",
        "card-gray": "rgb(112, 122, 131)",
      },
      backgroundColor: {
        "navy-blue": "rgb(32, 129, 226)",
        "neutral-7": "#8c8c8c",
        "neutral-3": "#f5f5f5",
        "white-1": "rgba(0,0,0,0.1)",
        "white-3": "rgba(0,0,0,0.3)",
        "black-pearl": "rgb(11, 14, 17)"
      },
      borderColor: {
        "navy-blue": "rgb(32, 129, 226)"
      },
      boxShadow: {
        "custom": "rgb(0 0 0 / 10%) 0px 0px 15px",
        "custom-lg": "rgb(0 0 0 / 20%) 0px 0px 12px"
      },
      gradientColorStops: {
        "slate-blue": "#6C45E9",
        "summer-sky": "#32A7F1",
        "bright-turquoise": "#1FE9F6",
      },
      animation: {
        "splash": "ping 2s cubic-bezier(0, 0, 0.2, 1) 1"
      },
      keyframes: {
        ping: {
          "0%": {
            transform: "scale(2)",
            opacity: 0,
          },
          "70%, 100%": {
            transform: "scale(1)",
            opacity: 1
          }
        }
      },
      cursor: {
        'zoom-in': 'zoom-in',
      }
    },
  },
  variants: {
    extend: {
      gradientColorStops: ['active', 'group-hover', 'hover'],
    },
  },
  plugins: [],
}
