export const load = ({ locals }) => {
    const isLogged = locals.pb.authStore.baseToken ? true : false;
    return { isLogged }
}