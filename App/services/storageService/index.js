import AsyncStorage from '@react-native-async-storage/async-storage'


export default class StorageService {

    static getItem = async name => {
        const value = await AsyncStorage.getItem(name);
        return JSON.parse(value);
    };

    static setItem = async (name, val) => await AsyncStorage.setItem(name, JSON.stringify(val));
}