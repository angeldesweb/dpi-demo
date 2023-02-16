export const load = async ({ params , locals }) => {
    const record = await locals.pb.collection('people').getOne(params.code);
    return { id: params.code , doc: {...record}}
}