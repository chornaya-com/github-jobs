import React from "react";
import axios from "axios";

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error"
}

const initialState = {
    jobs: [],
    loading: false
}

const url = "https://jobs.github.com/positions.json";

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading: true, jobs: []}
        case ACTIONS.GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.payload.error, jobs: []}
        default:
            return state
    }
}

export function useFetchJobs(params, page) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        dispatch({type: ACTIONS.MAKE_REQUEST});
        axios
            .get(url, {
                params: {markdown: true, page: page, ...params}
            })
            .then(response => {
                dispatch({type: ACTIONS.GET_DATA, payload: {jobs: response.data}})
            })
            .catch(error => {
                dispatch({type: ACTIONS.ERROR, payload: {error: error}})
            });
    }, [params, page]);

    return state
}