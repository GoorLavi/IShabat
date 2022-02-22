import create from 'zustand'
import cities from './cities.json'

export default create(set => ({
    city: cities[0],
    setCity: city => set({city})
}))
