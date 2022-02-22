import events from './events.json'

export const findComingEvents = () => {
    const current = new Date().getTime();
    return events.filter(e => (new Date(e.date).getTime() - current) > 0);
}

export const findNextEvent = () => {
    return findComingEvents()?.[0];
}
