export { }

declare global {
    var messageListeners: Map<string, Set<Function>> | undefined
} 