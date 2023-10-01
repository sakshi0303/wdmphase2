export function recordEvent(action: string, componentName: string, how: string) {
    // Mock an API call to the server (replace with actual API call)
    const apiEndpoint = 'https://example.com/api/events';
    const eventData = { action, componentName, how };
    console.debug('UX event: ', eventData)
}