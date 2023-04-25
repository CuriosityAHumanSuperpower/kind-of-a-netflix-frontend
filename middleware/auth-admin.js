
const ROLES = ['moderator', 'admin'];

export default async function({$auth, redirect}) {
	let user = $auth.state.user; 
	if(user && ROLES.includes(user.role)){
		//let the user in
	} else {
		redirect('/') //to the home page
	}
}