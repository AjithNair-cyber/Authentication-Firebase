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
    const [userInfo, setUserInfo] = useState({});

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const dbRef = ref(db)
                get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                    if (!snapshot.exists()) {
                        try {
                            set(ref(db, 'users/' + user.uid), {
                                username: user.displayName,
                                email: user.email,
                                profile_picture: user.photoURL,
                                provider: "google"
                            });

                        } catch (err) {
                            console.log(err)
                        }
                    }
                }).catch((error) => {
                    console.error(error);
                })
                setCurrentUser(user)
            }).catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage)
                setCurrentUser(null)

            });
    }

    const signInWithEmail = (email, password, username) => {
        createUserWithEmailAndPassword(auth, email, password, username)
            .then((userCredential) => {
                const user = userCredential.user;
                setCurrentUser(user)
                try {
                    set(ref(db, 'users/' + user.uid), {
                        username: username,
                        email: user.email,
                        profile_picture: user.photoURL,
                        provider: "email"
                    });
                } catch (err) {
                    console.log(err)
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage)
                setCurrentUser(null)
            });
    }

    const logInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setCurrentUser(user)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setAuthError(errorMessage)
                setCurrentUser(null)
            });
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setCurrentUser(null)
        }).catch((error) => {
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
                setUserInfo(snapshot.val());
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
        authError,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}