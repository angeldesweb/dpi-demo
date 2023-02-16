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
    getUsersByLocation: async ({ request , locals }) => {
        let data = await request.formData();
        let community = data.get('community');

        let records = await locals.pb.collection('people').getList();

        let people = []
        if(records.items.length) { 
            people = records
            .items.map(record => ({...record}))
            .filter(record => record.community === community)
            return { people}
        }
    }
}