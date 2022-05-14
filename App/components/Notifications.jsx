import {useEffect} from 'react'
import StorageService from '@services/storageService/index'
import {
    setEvent,
    getAllNotifications,
    isNotificationPermissionGranted,
    isNotificationInitialized,
    getPermission
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
                await getPermission();

                isPermissionGranted = await isNotificationPermissionGranted();
                debugger;

                console.log({isPermissionGranted})
                if (!isPermissionGranted) {
                    alert('האפליקציה צריכה אישור להשתמש בהתראות');
                    return;
                }
            }

            // Todo uncomment
            if (!initialized) {
                await setUpEventsNotifications();
                await StorageService.setItem(name, true);
            }
        })()
    }, [])

    return null;
}
