export const load = async ({ locals }) => {
    await locals.pb.authStore.clear();
}