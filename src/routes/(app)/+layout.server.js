export const load = async ({ locals , route }) => {
    let pathname = route.id.split('/')
    pathname.shift();
    pathname = pathname.filter(path => !path.startsWith('('));
    let dir = pathname.join('/');
    const isLogged = locals.pb.authStore.baseToken ? true : false;
    return { isLogged , dir }
}