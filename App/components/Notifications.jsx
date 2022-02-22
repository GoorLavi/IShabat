import {useEffect} from 'react'
import StorageService from '@services/storageService/index'
import {setEvent} from '@globals/notifications'
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
            const name = 'is-notifications-initialized';
            const initialized = await StorageService.getItem(name);

            if (!initialized) {
                await setUpEventsNotifications();
                await StorageService.setItem(name, true);
            }
        })()
    }, [])

    return null;
}
