import {Platform} from 'react-native';

export const pickByPlatform = ({android, ios}) => Platform.OS === 'ios' ? ios : android;
