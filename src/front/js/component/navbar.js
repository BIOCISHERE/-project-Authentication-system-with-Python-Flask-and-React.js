import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.token ? (
						<>
							<Link to="/login">
								<button className="btn btn-primary mx-1">Login</button>
							</Link>
							<Link to="/demo">
								<button className="btn btn-success mx-1">Signup</button>
							</Link>
						</>
					) : (
						<Link to="/">
							<button className="btn btn-danger mx-1" onClick={() => actions.logout()}>Logout</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
