export const load = async ({ locals }) => {
    const records = await locals.pb.collection('communities').getList();

    let communities = records.items.map(record => ({...record}));

    return {
        communities
    }
}