import React, { useState } from 'react';
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth, db } from './../../Pages/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignInSignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [loginForm, setloginForm] = useState(false);

    const navigate = useNavigate()

    const signupWithEmail = async () => {
        setLoading(true);
        if (name.length > 0 && email.length > 0 && password.length >= 6) {
            if (password == confirmPassword) {
                try {
                    const result = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    const user = result.user;
                    toast.success("Successfully Signed Up!");
                    console.log(user);
                    createDoc(user);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    navigate('/dashboard');
                } catch (error) {
                    toast.error(error.message);
                    console.error(
                        "Error signing up with email and password: ",
                        error.message
                    );
                }
            } else {
                toast.error("Password not matched")
            }
        } else {
            toast.error("All fields are mandatory")
        }
        setLoading(false);
    }

    const handleSignOn = () => {
        setloginForm(true);
    }

    const handleNewRegistration = () => {
        setloginForm(false);
    }

    const signOnWithEmail = () => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setEmail("");
                setPassword("");
                toast.success("Success");
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode, errorMessage);
            });
    }

    async function createDoc(user) {
        console.log("doc", user);

        if (!user) return;

        const useRef = doc(db, 'users', user.uid);
        const userData = await getDoc(useRef);

        if (!userData.exists()) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date(),
                });
                toast.success("Doc created, Successfully..!");
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("Doc already created");
        }
    }

    return (
        <>
            {loginForm ? (
                <div className='signon-wrapper'>
                    <h2 className='title'> Sign on
                        <span style={{ color: "var(--theme)" }}> Fin-Track</span>
                    </h2>
                    <form>
                        <Input
                            label={'Email'}
                            state={email}
                            setState={setEmail}
                            placeholder={'john@email.com'}
                            type={'text'}
                        >
                        </Input>

                        <Input
                            label={'Password'}
                            state={password}
                            setState={setPassword}
                            placeholder={'Password'}
                            type={'password'}
                        >
                        </Input>

                        <Button
                            text={loading ? 'loading' : 'Sign On with Email & Password'}
                            onClick={signOnWithEmail}
                        ></Button>
                        
                        <p onClick={handleNewRegistration} style={{ textAlign: "center" }}>New Registration</p>
                    </form>
                </div>

            ) :

                (<div>
                    <div className='signup-wrapper'>
                        <h2 className='title'> Signup on
                            <span style={{ color: "var(--theme)" }}> Fin-Track</span>
                        </h2>
                        <form>
                            <Input
                                label={'Full Name'}
                                state={name}
                                setState={setName}
                                placeholder={'John Doe '}
                                type={'text'}
                            >
                            </Input>

                            <Input
                                label={'Email'}
                                state={email}
                                setState={setEmail}
                                placeholder={'john@email.com'}
                                type={'text'}
                            >
                            </Input>

                            <Input
                                label={'Password'}
                                state={password}
                                setState={setPassword}
                                placeholder={'Password'}
                                type={'password'}
                            >
                            </Input>

                            <Input
                                label={'Confirm Password'}
                                state={confirmPassword}
                                setState={setConfirmPassword}
                                placeholder={'Confirm Password'}
                                type={'password'}
                            >
                            </Input>

                            <Button
                                text={loading ? 'loading' : 'Sign Up with Email & Password'}
                                onClick={signupWithEmail}
                            ></Button>
                            <p onClick={handleSignOn} style={{ textAlign: "center" }}>Already have ? </p>
                        </form>
                    </div>
                </div>

                )}
        </>
    )
}

export default SignInSignUp;

