/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        20: '20vh', // Custom height
        10: '10vh', // Another custom height
        71: '70vh',
      },
      colors: {
        primary: {
          light: '#FFCDD2', // light red
          DEFAULT: '#F44336', // red (Pokéball Red)
          dark: '#D32F2F', // dark red
        },
        secondary: {
          light: '#B0BEC5', // light gray
          DEFAULT: '#263238', // black (Pokéball Black)
          dark: '#000000', // pure black
        },
        accent: {
          light: '#FFF59D', // light yellow
          DEFAULT: '#FFEB3B', // yellow (Pikachu Yellow)
          dark: '#FBC02D', // dark yellow
        },
        background: {
          light: '#E1F5FE', // light blue
          DEFAULT: '#81D4FA', // blue (Squirtle Blue)
          dark: '#29B6F6', // dark blue
        },
        text: {
          light: '#B3E5FC', // light blue
          DEFAULT: '#0277BD', // dark blue (Squirtle Dark Blue)
          dark: '#01579B', // darker blue
        },
        complementary: {
          light: '#A8E6CF', // light green
          DEFAULT: '#4CAF50', // green (Bulbasaur Green)
          dark: '#388E3C', // dark green
        },
      },
      boxShadow: {
        pokeball: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        pokeball: '50%',
        'custom-trapezoid': '90% 90% 120% 60% / 90% 90% 60% 60%',
      },
      borderWidth: {
        pokeball: '4px',
      },
      backgroundColor: {
        base: '#f2f2f2a9',
        green: '#57ba97c8',
        deep: '#3b945fbd',
        darker: '#182628',
        'dirty-green': '#687864',
        'blue-green': '#31708e',
        light: '#E1F5FE', // light blue
        DEFAULT: '#81D4FA', // blue (Squirtle Blue)
      },
      backgroundImage: {
        fight2: "url('./bg-images/battle-background1.jpeg')",
        ruins: 'url(./bg-images/ruins-background.png)',
        'city-mist': 'url(./bg-images/city-area-mist.png)',
        fight: 'url(./bg-images/battle-bg2.png)',
        'gradient-green': 'linear-gradient(to right, rgba(49, 112, 142, 0.8), rgba(144, 238, 144, 0.0))',
        'gradient-reverse-green': 'linear-gradient(to left, rgba(49, 112, 142, 0.8), rgba(144, 238, 144, 0.0))',
      },
      margin: {
        half: '28vw',
      },
      screens: {
        sm: { max: '400px' },
      },
      transform: {
        'scale-80': 'scale(0.8)',
      },
      keyframes: {
        wiggle: {
          '0%, 5%': {
            transform: 'rotateZ(2deg)',
            '-ms-transform-origin-x': '5px',
          },
          '10%': {
            transform: 'rotateZ(-6deg)',
            '-ms-transform-origin-y': '10px',
          },
          '14%': {
            transform: 'rotateZ(8deg)',
            'background-color': 'rgb(255, 91, 91)',
          },
          '20%': {
            transform: 'rotateZ(-7deg)',
          },
          '24%': {
            transform: 'rotateZ(5deg)',
          },
          '28%': {
            transform: 'rotateZ(-3deg)',
          },
          '32%': {
            transform: 'rotateZ(3deg)',
          },
          '37%': {
            transform: 'rotateZ(-1deg)',
          },
          '40%, 100%': {
            transform: 'rotateZ(0)',
          },
        },
        pulseCustom: {
          '0%, 100%': { backgroundColor: 'rgb(248 113 113)' },
          '50%': { backgroundColor: 'rgb(239 68 68)' },
          '25%': { transform: 'scale(1.05)' },
          '75%': { transform: 'scale(1.05)' },
        },
        pulseDelay: {
          '0%, 80%': { opacity: '1' },
          '100%': { opacity: '1' },
          '85%, 90%, 95%': { backgroundColor: 'rgb(248 113 113)' },
        },
      },
      animation: {
        wiggle: 'wiggle 2s linear 4s infinite',
        pulseCustom: 'pulseDelay 4s ease-in-out infinite, pulseCustom 4s 4s ease infinite',
      },
      // Define custom button styles
      components: {
        '.btn-main': {
          fontSize: '1.25rem',
          width: '16vw',
          minWidth: '110px',
          backgroundColor: '#FFEB3B', // accent color
          backgroundOpacity: '0.8',
          borderColor: 'black',
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: '#dc2626', // red-600
          },
          padding: '0.25rem',
          margin: '0.25rem',
          color: '#263238', // secondary color
          height: '8vh',
          maxHeight: '64px',
          minHeight: '36px',
          borderRadius: '1rem', // rounded-2xl
        },
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.btn-main': {
          fontSize: '1.25rem',
          width: '16vw',
          minWidth: '110px',
          backgroundColor: '#FFEB3B', // accent color
          backgroundOpacity: '0.8',
          borderColor: 'black',
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: '#dc2626', // red-600
          },
          padding: '0.25rem',
          margin: '0.25rem',
          color: '#263238', // secondary color
          height: '8vh',
          maxHeight: '64px',
          minHeight: '36px',
          borderRadius: '1rem', // rounded-2xl
        },
      })
    },
  ],
}
