import { Dispatch } from 'react';
import axios from 'axios';

export const CREATE_SHORT_URL = 'CREATE_SHORT_URL';
export const REDIRECT_URL_REQUEST = 'REDIRECT_URL_REQUEST';
export const REDIRECT_URL_SUCCESS = 'REDIRECT_URL_SUCCESS';
export const REDIRECT_URL_FAILURE = 'REDIRECT_URL_FAILURE';

export interface ShortenAction {
    type: typeof CREATE_SHORT_URL;
    payload: string | {};
}

export interface RedirectAction {
    type:
        | typeof REDIRECT_URL_REQUEST
        | typeof REDIRECT_URL_SUCCESS
        | typeof REDIRECT_URL_FAILURE;
    payload: string | {};
}

export const createShortUrl = (url: string) => {
    return (dispatch: Dispatch<any>) => {
        const options = {
            headers: { 'Content-Type': 'application/json' },
        };
        axios
            .post(
                'http://localhost:8080/shorten',
                { originalUrl: url },
                options
            )
            .then((resp) => {
                dispatch({
                    type: CREATE_SHORT_URL,
                    payload: resp.data.url,
                });
            })
            .catch((error) => error);
    };
};

export const redirectFromShortUrl = (url: string) => {
    return (dispatch: Dispatch<any>) => {
        let splitUrl = url.split('/');
        let hash = splitUrl[splitUrl.length - 1];
        dispatch({
            type: REDIRECT_URL_REQUEST,
        });
        axios
            .get(`http://localhost:8080/${hash}`)
            .then((resp) => {
                dispatch({
                    type: REDIRECT_URL_SUCCESS,
                    payload: resp.data.url,
                });
            })
            .catch((error) => {
                dispatch({
                    type: REDIRECT_URL_FAILURE,
                    payload: error.response.data.url,
                });
            });
    };
};
