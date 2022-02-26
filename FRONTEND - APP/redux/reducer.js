import * as Actions from "./actions";
import * as Utils from "../utils";

const setUser = (user) => {
	Utils.setUser(user)
}

const removeUser = () => {
	Utils.removeUser();
}

const initialState = {
	host: "https://evropski-dnevnik-dev.herokuapp.com",
	user: {
		username: "",
		_id: "",
		email: "",
		level: 0,
		token: ""
	}
}

export default  reducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_USER:
			setUser(action.user)
			return {...state, user: {...action.user}};
		case Actions.REMOVE_USER:
			removeUser()
			return {...state, user: {...initialState.user}};
		default:
			return state
	}
} 