import { DISPLAY_NOTIFICATION } from '../constants';

export function displayNotification(title, message, level) {
    return {
        type: DISPLAY_NOTIFICATION,
        payload: {
            title,
            message,
            level
        }
    };
}   