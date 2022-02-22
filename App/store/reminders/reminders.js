import create from 'zustand'
import {persist} from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default create(persist((set, get) => ({
    reminders: [],
    addReminder: () => {
        set({reminders: [...(get().reminders || []), {id: String.random(), isNew: true}]});
    },
    setReminder: ({isNew, ...reminder}) => {
        set({reminders: get().reminders.map(r => r.id === reminder.id ? reminder : r)})
    },
    removeReminder: id => set({reminders: get().reminders.filter(r => r.id !== id)}),
}), {
    name: "reminders",
    getStorage: () => AsyncStorage
}));
