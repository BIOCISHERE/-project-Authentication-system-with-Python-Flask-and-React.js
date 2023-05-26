import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const redirect = useNavigate();

    if(store.user && store.user != "" && store.user != undefined) redirect("/login")

    return (
        <div className="mt-5">
            <div className="row">
                <div className="col-6 bg-secondary border border-secondary rounded mx-auto">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h1 className="text-light">SignUp</h1>
                        <div className="my-3">
                            <label htmlFor="exampleInputEmail2" className="form-label text-center text-light">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword2" className="form-label text-light">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Example123" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success mb-3" onClick={() => {
                                if (email === "" && password === "") {
                                    alert("You must enter a email and a password")
                                }
                                else if (email === "") {
                                    alert("You must enter a email")
                                }
                                else if (password === "") {
                                    alert("You must enter a password")
                                }
                                else {
                                    actions.signup(email, password)
                                }
                            }}>SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
