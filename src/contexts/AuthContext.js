import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import { ref, set, update, get, child } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState("");
    console.log(db)
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                const dbRef = ref(db)
                get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log("Snapshot" + snapshot.val());
                    } else {
                        try {
                            set(ref(db, 'users/' + user.uid), {
                                username: user.displayName,
                                email: user.email,
                                profile_picture: user.photoURL
                            });
                            console.log("success")
                        } catch (err) {
                            console.log(err)
                        }
                        console.log("success")
                    }
                }).catch((error) => {
                    console.error(error);
                });




                // const userRef = ref.child('users');
                // userRef.set({

                // })
                // // The signed-in user info.
                setCurrentUser(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(errorMessage)
                // The email of the user's account used.
                setCurrentUser(null)
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

            });
    }

    const signInWithEmail = (email, password, username) => {
        createUserWithEmailAndPassword(auth, email, password, username)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setCurrentUser(user)
                try {
                    set(ref(db, 'users/' + user.uid), {
                        username: username,
                        email: user.email,
                        profile_picture: user.photoURL
                    });
                } catch (err) {
                    console.log(err)
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(errorMessage)
                setCurrentUser(null)
                // ..
            });
    }

    const logInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setCurrentUser(user)

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(errorMessage)
                setCurrentUser(null)
            });
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setCurrentUser(null)
        }).catch((error) => {
            // An error happened.
            setAuthError(error.message);
        });
    }

    const updateUserInfo = (name, address, age) => {
        try {
            update(ref(db, 'users/' + currentUser.uid), {
                full_name: name,
                address: address,
                age: age
            });
        } catch (err) {
            setAuthError(err)
        }
    }

    const getUserInfo = () => {
        const dbRef = ref(db)
        get(child(dbRef, `users/${currentUser.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                console.log(snapshot.val().email);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        signInWithGoogle,
        signInWithEmail,
        logOut,
        logInWithEmail,
        updateUserInfo,
        getUserInfo,
        currentUser,
        authError
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}