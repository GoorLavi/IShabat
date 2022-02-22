import create from 'zustand'
import {findNextEvent} from './helper'

export default create(set => {
    const nextEvent = findNextEvent();

    return ({
        nextEvent,
        waiting: false,
        refreshNextEvent: async () => {
            set({waiting: true})

            // await new Promise(r => setTimeout(r, 3000));
            const nextEvent = findNextEvent();
            
            set({nextEvent, waiting: false})
        }
    })
})
