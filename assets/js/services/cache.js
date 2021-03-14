const cache = {};

function set(key, data) {
    cache[key] = {
    data,
    cacheAt: new Date().getTime()
    };
}

function get(key) {
    return new Promise((resolve)=>{
        resolve(cache[key] && cache[key].cacheAt + 15*60*1000 < new Date().getTime() ? cache[key].data : null)
    })
}

export default {
    set,
    get
};