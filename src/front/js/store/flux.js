const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				const store = getStore()
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				}
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello", opts)
					const data = await resp.json()
					sessionStorage.setItem("message", data.message)
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return true
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}

				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/token", opts)
					if (resp.status != 200) {
						alert("Invalid email or password")
						return false
					}

					const data = await resp.json();

					sessionStorage.setItem("token", data.access_token);
					sessionStorage.setItem("user", email)
					setStore({token: data.access_token});
					setStore({user: email})
					return true;
				}
				catch(error){
					console.error("There has been an error login in", error)
				}
			},
			logout: () => {
				sessionStorage.removeItem("token")
				sessionStorage.removeItem("user")
				setStore({token: null})
				setStore({user: null})
				setStore({message: null})
			},
			signup: async (email, password) => {
				const opts2 = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password,
						"is_active": true
					})
				}
				
				try {
					const resp2 = await fetch(process.env.BACKEND_URL + 'api/signup', opts2)
					if(resp2.status!=201){
						alert("something went wrong :(")
						return false
					}

					const data2 = await resp2.json()

					sessionStorage.setItem("user", data2.user)
					setStore({user: data2.user})
					return true
					
				} catch (error) {
					console.error("Thre has been an error with the signup", error)
				}
			},
			saveToken: () => {
				const token = sessionStorage.getItem("token")
				const message = sessionStorage.getItem("message")
				if(token && token != "" && token != undefined) setStore({token: token})
				if(message && message != "" && message != undefined) setStore({message: message})
			}
		}
	};
};

export default getState;
