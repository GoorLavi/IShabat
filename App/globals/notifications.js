import * as Notifications from 'expo-notifications';
import StorageService from '@services/storageService';


export const notificationInitializedKey = 'is-notifications-initialized';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


const identifier = 'shabat';

export const setEvent = async ({date, type}) => {
    const isShabat = type === "שבת";

    const getTitle = () => isShabat ? "שבת שלום" : "חג שמח"
    const eventBodyTemplate = time => `עוד ${time} לכניסת ${isShabat ? "השבת" : "החג"}`;

    const title = getTitle();

    const hourEventDate = new Date(date.setMinutes(date.getMinutes() - 60));
    await scheduleNotification({date: hourEventDate, title, groupName: identifier, body: eventBodyTemplate("שעה")});

    const halfAnHourEventDate = new Date(new Date(date).setMinutes(date.getMinutes() - 30));
    await scheduleNotification({
        date: halfAnHourEventDate,
        title,
        groupName: identifier,
        body: eventBodyTemplate("חצי שעה")
    });
}

export const scheduleNotification = async ({date, title, body}) => {

    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            sound: 'default' | 'defaultCritical',
            categoryIdentifier: identifier,
            data: {
                date
            },
            // Android only
            vibrationPattern: [0, 250, 250, 250],
        },
        trigger: date,
    });
}

export const getAllNotifications = async () => {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log({notifications});
}


export const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export const getPermission = async () => {
    return await Notifications.getPermissionsAsync()
}

export const askPermission = async () => {
    return await Notifications.requestPermissionsAsync();
}


export const isNotificationPermissionGranted = async () => {
    const {status} = await getPermission();

    return status === 'granted';
}

export const isNotificationInitialized = async () => {
    return await StorageService.getItem(notificationInitializedKey);
}


export const setNotificationInitialized = async (value) => {
    return await StorageService.setItem(notificationInitializedKey, value);
}


