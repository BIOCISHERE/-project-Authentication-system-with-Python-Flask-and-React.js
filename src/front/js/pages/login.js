import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = sessionStorage.getItem("token")


    const loginOnclick = () => {
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

        fetch('https://3001-biocishere-projectauthe-oj3dp7tghwl.ws-us98.gitpod.io/api/token', opts)
            .then((resp) => {
                if (resp.status === 200) return resp.json();
                else alert("Something went wrong :(")
            })
            .then((data) => {
                sessionStorage.setItem("token", data.access_token)
            })
            .catch((error) => console.error('This is an error', error))


    }

    return (
        <div className="mt-5">
            <div className="row">
                <div className="col-6 bg-secondary border border-secondary rounded mx-auto">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {(token && token != "" && token != undefined) ? (
                            "You are logged in with this token " + token
                        ) : (
                            <>
                                <div className="my-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label text-center text-light">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Example123" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary mb-3" onClick={() => loginOnclick()}>Login</button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
