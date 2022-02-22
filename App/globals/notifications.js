import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const setEvent = async ({date, type}) => {
    const isShabat = type === "שבת";

    const getTitle = () => isShabat ? "שבת שלום" : "חג שמח"
    const eventBodyTemplate = time => `עוד ${time} לכניסת ${isShabat ? "השבת" : "החג"}`;

    const title = getTitle();
    const groupName = 'shabat';

    const hourEventDate = new Date(date.setMinutes(date.getMinutes() - 60));
    await scheduleNotification({date: hourEventDate, title, groupName, body: eventBodyTemplate("שעה")});

    const halfAnHourEventDate = new Date(new Date(date).setMinutes(date.getMinutes() - 30));
    await scheduleNotification({date: halfAnHourEventDate, title, groupName, body: eventBodyTemplate("חצי שעה")});
}

export const scheduleNotification = async ({date, title, groupName, body}) => {

    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            sound: 'default' | 'defaultCritical',
            categoryIdentifier: groupName,
            data: {
                date
            },
            // Android only
            vibrationPattern: [0, 250, 250, 250],
        },
        trigger: date,
    });
}
