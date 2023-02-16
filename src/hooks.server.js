import PocketBase from 'pocketbase';

export const handle = async ({ event , resolve }) => {

    event.locals.pb = new PocketBase('https://dpi-pocket.pockethost.io');

    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
    } catch (_) {
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}