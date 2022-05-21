import {useEffect} from 'react'
import {
    setEvent,
    getAllNotifications,
    isNotificationPermissionGranted,
    isNotificationInitialized,
    askPermission,
    cancelAllNotifications,
    setNotificationInitialized
} from '@globals/notifications'
import {findComingEvents} from '@store/nextEvent/helper'

const setUpEventsNotifications = async () => {

    const events = findComingEvents();

    for (const {date, TelAviv_in, type} of events) {
        await setEvent({
            type,
            date: new Date(`${date}T${TelAviv_in}`)
        })
    }
}

export default () => {


    useEffect(() => {
        (async () => {
            await getAllNotifications();

            const initialized = await isNotificationInitialized();

            let isPermissionGranted = await isNotificationPermissionGranted();

            if (!isPermissionGranted) {
                isPermissionGranted = await askPermission();

                console.log({isPermissionGranted})
                if (!isPermissionGranted) {
                    alert('האפליקציה צריכה אישור להשתמש בהתראות');
                    return;
                }
            }

            if (!initialized) {
                await setUpEventsNotifications();
                await setNotificationInitialized(name, true);
            }
        })()
    }, [])

    return null;
}
