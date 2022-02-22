import * as Device from 'expo-device';

export const pickByPlatform = ({
                                   android,
                                   ios
                               }) => (Device.osName === 'iOS' || Device.osName === 'iPadOS') ? ios : android;
