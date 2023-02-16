export const load = async ({ locals }) => {
    try {
        const list = await locals.pb.collection('communities').getList();
        const communities = list.items.map(record => ({...record}));
        return { communities }
    } catch (error) {
        console.log(error)
    }
}

const createDoc = async (pb,data) => {
    const record = await pb.collection('people').create({...data},{'$autoCancel': false});
    return {...record};
}

export const actions = {
    addmany: async ({ url , locals }) => {
        let users = url.searchParams.get('users');

        users = JSON.parse(users);  
        
        const records = users.map( async (obj) => await createDoc(locals.pb,obj))
        
        let docs = await Promise.all(records);
        if(docs.length === users.length) return {
            success: true
        }
    },
}