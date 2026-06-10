/**
 * Sends a message to the parent window.
 * @param {string} type - The type of message to send.
 * @param {object} payload - The data to send with the message.
 */
export const sendMessage = (type:any, payload?:any) => {
    // Ensure we are in an iframe context
    if (window.parent !== window) {
        window.parent.postMessage({type, payload}, '*'); // Use a specific target origin in production
    }
};
