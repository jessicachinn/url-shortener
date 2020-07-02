import {
    CREATE_SHORT_URL,
    REDIRECT_URL_REQUEST,
    REDIRECT_URL_SUCCESS,
    REDIRECT_URL_FAILURE,
} from './actions';
import { AnyAction } from '@reduxjs/toolkit';

export interface AppState {
    originalUrl: string;
    shortUrl: string;
    linkCreated: boolean;
    redirect: boolean;
    redirectError: boolean;
}

const initialState: AppState = {
    originalUrl: '',
    shortUrl: '',
    linkCreated: false,
    redirect: false,
    redirectError: false,
};

export function urlReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case CREATE_SHORT_URL:
            return {
                ...state,
                shortUrl: action.payload.shortenedUrl,
                originalUrl: action.payload.originalUrl,
                linkCreated: true,
            };
        case REDIRECT_URL_REQUEST:
            return {
                ...state,
            };
        case REDIRECT_URL_SUCCESS:
            return {
                ...state,
                originalUrl: action.payload.originalUrl,
                redirect: true,
            };
        case REDIRECT_URL_FAILURE:
            return {
                ...state,
                redirectError: true,
                originalUrl: action.payload.originalUrl,
                redirect: false,
            };
        default:
            return state;
    }
}
