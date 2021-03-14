import axios from "axios";
import Cache from "./cache";
import {EVENTS_API} from '../config'

async function findAll() {

    const cachedEvents = await Cache.get("events")
    if (cachedEvents) { return cachedEvents; }

    return axios
    .get(EVENTS_API)
    .then(response => {
        const events = response.data['hydra:member'];
        Cache.set("events", events);
        return events;
    })
}

async function find(id) {
    const cachedEvent = await Cache.get("events." + id);
    if (cachedEvent) return cachedEvent;
    return axios
    .get(EVENTS_API +"/"+ id)
    .then(response => {
        const event = response.data;
        Cache.set("events."+id, event)

        return event;
    })
}

function create(eventContent) {
    return axios
    .post(EVENTS_API, eventContent)
    .then(async response => {
        const cachedEvents = await Cache.get("events");

        if (cachedEvents) {
            Cache.set("events", [...cachedEvents, response.data])
        }
        return response;
    })
}

function update(id, eventContent) {
    return axios
    .put(EVENTS_API + "/" + id, eventContent)
    .then(async response => {
        const cachedEvents = await Cache.get("events");
        const cachedEvent = await Cache.get("events." +id);
        if (cachedEvent) {
            Cache.set("customers." + id, response.data);
        }
        if (cachedEvents) {
            const index = cachedEvents.findIndex(e => e.id === +id);
            cachedEvents[index] = response.data;  
        }

        return response;
    })
}

function deleteEvent() {
    return axios
    .delete(EVENTS_API +"/"+ id)
    
}

export default {
    findAll,
    find,
    create,
    update
}