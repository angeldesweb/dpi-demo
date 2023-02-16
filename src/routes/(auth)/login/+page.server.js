import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
    
        const email = data.get('email');
        const password = data.get('password');

        if(!email) return fail(400,{email,missing:true});

        if(!password) return fail(400,{incorrect:true});

        try {
            const { token, record } = await locals.pb.collection('users').authWithPassword(email, password);
            return { ...record , token }
        } catch (error) {
            return fail(error.status,{invalid:true}); 
        }
    }
}