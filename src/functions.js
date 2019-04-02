import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const bearer = localStorage.getItem('token');

export const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}


//-- Handle Errors for fetch data from api
function handleErrors(resp) {
    let json = resp.json(); // there's always a body
    if (resp.status >= 200 && resp.status < 300) {
        return json;
    } else {
        return json.then(Promise.reject.bind(Promise));
    }
}

//-- GET Method
export const get = (url) => {

    const apiUrl = process.env.REACT_APP_HOST + url;

    // var bearer = 'Bearer '+ localStorage.getItem('token');

    const options = {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Authorization": bearer,
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    }

    return fetch(apiUrl, options)
        // .then(function (response) {
        //     return response.json();
        // })
        .then(handleErrors)
        .then(function (myJson) {
            return myJson
        });
}



//-- DELETE Method
export const deleteMethod = (url, data={}) => {

    const apiUrl = process.env.REACT_APP_HOST + url;

    // var bearer = 'Bearer '+ localStorage.getItem('token');

    const options = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Authorization": bearer,
            "Content-Type": "application/json",
            // "token": localStorage.getItem('token')
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data)
    }

    return fetch(apiUrl, options)
        .then(handleErrors)
        .then(function (myJson) {
            return myJson
        });
}


export const put = (url, data) => {

    const apiUrl = process.env.REACT_APP_HOST + url;

    const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        // credentials: 'include',
        headers: {
            "Authorization": bearer,
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data)
    }

    return fetch(apiUrl, options)
        .then(handleErrors)
        .then(function (myJson) {
            // return JSON.stringify(myJson)
            return myJson
        })
}


export const post = (url, data) => {

    const apiUrl = process.env.REACT_APP_HOST + url;

    const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        // credentials: 'include',
        headers: {
            "Authorization": bearer,
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data)
    }

    return fetch(apiUrl, options)
        .then(handleErrors)
        .then(function (myJson) {
            // return JSON.stringify(myJson)
            return myJson
        })
}

export const postWithoutToken = (url, data) => {

    const apiUrl = process.env.REACT_APP_HOST + url;

    const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        // credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data)
    }

    return fetch(apiUrl, options)
        .then(handleErrors)
        .then(function (myJson) {
            // return JSON.stringify(myJson)
            return myJson
        })
}