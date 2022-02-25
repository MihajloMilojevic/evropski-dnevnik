import * as Actions from "./actions";
import * as Utils from "../utils";

const setUser = (user) => {
	Utils.setUser(user)
}

const removeUser = () => {
	Utils.removeUser();
}

const initialState = {
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
			return {user: {...action.user}};
		case Actions.REMOVE_USER:
			removeUser()
			return {user: {...initialState}};
		default:
			return state
	}
} 