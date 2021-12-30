const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const fetchGet = async ( request: {
    path:string, 
    onFetch: (json:any) => void,
    headers?: undefined | {},
}) => {
    await fetch(request.path, {
        headers: request.headers ? request.headers : defaultHeaders,
    })
    .then(raw => raw.json())
    .then(json => request.onFetch(json));
};

export const fetchUpdate = async ( request: {
    path:string, 
    method: 'PUT' | 'PATCH' | 'POST',
    onFetch: (json:any) => void,
    payload?: undefined | {},
    headers?: undefined | {},
}) => {
    await fetch(request.path, {
        method: request.method,
        headers: request.headers ? request.headers : defaultHeaders,
        body: request.payload ? JSON.stringify(request.payload) : JSON.stringify({})
    })
    .then(raw => raw.json())
    .then(json => request.onFetch(json));
};

export const fetchDelete = async ( request: {
    path: string, 
    headers?: undefined | {},
}) => {
    await fetch(request.path, {
        method: 'DELETE',
        headers: request.headers ? request.headers : defaultHeaders
    });
};