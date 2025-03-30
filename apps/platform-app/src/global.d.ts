/* eslint-disable */
// Define types for global message listeners
declare global {
    var messageListeners: Map<string, Set<Function>> | undefined
}

export { }