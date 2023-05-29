import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link, useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const redirect = useNavigate();

    //if(store.token && store.token != "" && store.token != undefined) redirect("/")

    return (
        <div className="">
            {(store.message && store.message != "" && store.message != undefined) ? (
                <div className="mx-3">
                    <h1>Users only</h1>
                    <p>If you are seeing this, then you are a user. Thanks for creating an account.</p>
                    <h4>Here is a meme i found</h4>
                    <div className="row">
                        <div className="col d-flex align-items-center justify-content-center">
                            <img src="https://pbs.twimg.com/media/FVtFdCoXEAAjLqx.jpg" className="img-fluid" alt="..." />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="alert alert-danger text-center" role="alert">
                        To see this page you must first <Link to={"/login"} className="alert-link">login</Link>. If you don't have an account you can <Link to={"/signup"} className="alert-link">signup</Link>.
                    </div>
                </>
            )}
        </div>
    );
};
