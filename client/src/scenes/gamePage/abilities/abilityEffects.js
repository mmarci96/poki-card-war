// abilityEffects.js
const abilityEffects = {
  'solar-power': (pokemon) => {
    if (pokemon.isSunny) {
      pokemon.attack *= 1.5
    }
  },
  chlorophyll: (pokemon) => {
    if (pokemon.isSunny) {
      pokemon.speed *= 2
    }
  },
  // Add more abilities here
}

export default abilityEffects
