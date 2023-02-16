export const load = async ({ locals }) => {
    try {
        const list = await locals.pb.collection('communities').getList();
        const communities = list.items.map(record => ({...record}));
        return { communities }
    } catch (error) {
        console.log(error)
    }
}

export const actions = {
    default: async ({ request , locals }) => {
        const data = await request.formData();
        const name = data.get('name');
        const cui = data.get('cui');
        let birth = data.get('birth');
        const community = data.get('community');

        birth = new Date(birth);
        console.log(birth)
        const record = await locals.pb.collection('people').create({
            name,
            cui,
            birth,
            community
        })

        return {
            success: true,
            record:{
                ...record
            }
        }
    }
}