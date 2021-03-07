import React from "react";
import axios from "axios";

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error",
    UPDATE_HAS_NEXT_PAGE: "update-has-next-page"
}

const initialState = {
    jobs: [],
    loading: false
}

const url = "https://us-central1-github-jobs-861b5.cloudfunctions.net/queryJobs";

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading: true, jobs: []}
        case ACTIONS.GET_DATA:
            return {...state, error: undefined, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state, loading: false, error: action.payload.error, jobs: []}
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {...state, hasNextPage: action.payload.hasNextPage}
        default:
            return state
    }
}

function fetchJobs(page, params, dispatch) {
    const cancelToken = axios.CancelToken.source();
    const request = axios
        .get(url, {
            cancelToken: cancelToken.token,
            params: {page, ...params}
        })
        .catch(error => {
            if (!axios.isCancel(error)) {
                return dispatch({type: ACTIONS.ERROR, payload: {error}})
            }
        });

    return {
        request,
        cancel: () => {
            cancelToken.cancel();
        }
    }
}

export function useFetchJobs(params, page) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        dispatch({type: ACTIONS.MAKE_REQUEST});

        const currentPageJobs = fetchJobs(page, params, dispatch);
        currentPageJobs.request
            .then(response => {
                if (!response) {
                    return;
                }
                dispatch({type: ACTIONS.GET_DATA, payload: {jobs: response.data}})
            });

        const nextPageJobs = fetchJobs(page, params, dispatch);
        nextPageJobs.request
            .then(response => {
                if (!response) {
                    return;
                }
                dispatch({type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: {hasNextPage: response.data.length !== 0}})
            });

        return () => {
            currentPageJobs.cancel();
            nextPageJobs.cancel();
        }
    }, [params, page]);

    return state
}