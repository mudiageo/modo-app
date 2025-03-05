import { redirect } from '@sveltejs/kit';

// export const prerender = true;

export const load = async (event) => {
	const session = await event.locals.auth();

	console.log(session);
	
	if (session?.user?.id) {
		return redirect(303, '/app');
	}

	return {
		session
	};
};
