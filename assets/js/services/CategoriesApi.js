import axios from "axios";
import {CATEGORIES_API} from '../config'

function findAll() {
    return axios
    .get(CATEGORIES_API)
    .then(response => response.data['hydra:member'])
}


export default {
    findAll
}