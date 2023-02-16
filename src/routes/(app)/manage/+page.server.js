import { fail } from '@sveltejs/kit';

export const actions = {
    addcommunity: async ({ request , locals }) => {
        
        const data = await request.formData();

        let name = data.get('name');

        if(!name) return fail(400,{missing:true});

        await locals.pb.collection('communities').create({name});

        return { success : true }
    },
    updateCommunity: async ({ url , locals }) => {
        const name = url.searchParams.get('name');
        const id = url.searchParams.get('id');
        
        await locals.pb.collection('communities').update(id,{name});

        return { success : true }
    },
    deleteCommunity: async ({ url , locals }) => {
        const id = url.searchParams.get('id');
        
        await locals.pb.collection('communities').delete(id);

        return { success : true }
    }   
}