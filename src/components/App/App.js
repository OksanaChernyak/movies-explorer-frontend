import "./App.css";
import {useState, useEffect} from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import * as mainApi from "../../utils/MainApi";
import {moviesApi} from "../../utils/MoviesApi";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute";


export default App;

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [movies, setMovies] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPreloaderActive, setIsPreloaderActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        tokenCheck()
    }, []);

    useEffect(() => {
        if (loggedIn) {
            mainApi.getUserData()
                .then((res) => {
                    console.log(res)
                    setCurrentUser(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            mainApi.getMovies()
                .then((res) => {
                        setMovies(res);
                    }
                )
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

    const handleLogin = ({email, password}) => {
        setIsPreloaderActive(true);
        mainApi.login({email, password})
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setLoggedIn(true);
                    navigate("/movies");
                }
            })
            .catch((err) => {
                console.log(err);
                setIsPreloaderActive(false);
            })
    };

    const handleRegister = ({name, email, password}) => {
        setIsPreloaderActive(true);
        mainApi.register({name, email, password})
            .then((res) => {
                console.log(res);
                if (res) {
                    handleLogin({email:email, password: password})
                }
            })
            .catch((err) => {
                console.log(err);
                setIsPreloaderActive(false);
            })
    };
    const handleChangeProfile = ({name, email}) => {
        mainApi.changeUserData({name, email})
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const tokenCheck = () => {
        let token = localStorage.getItem("token");
        if (token) {
            mainApi.getContent(token)
                .then((res) => {
                    setLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <div className="page__content">
                <Routes>
                    <Route path="/signin"
                           element={<Login loggedIn={loggedIn} handleLogin={handleLogin}
                                           tokenCheck={tokenCheck}/>}/>
                    <Route path="/signup"
                           element={<Register loggedIn={loggedIn} handleRegister={handleRegister}/>}/>

                    <Route path="/movies"
                           element={<ProtectedRoute path="/movies" loggedIn={loggedIn}><Movies isMovies={true}/></ProtectedRoute>}/>
                    <Route path="/saved-movies"
                           element={<ProtectedRoute path="/saved-movies" loggedIn={loggedIn}><SavedMovies isMovies={false}/></ProtectedRoute>}/>
                    <Route path="/profile"
                           element={<ProtectedRoute path="/profile" loggedIn={loggedIn}><Profile handleChangeProfile={handleChangeProfile}/></ProtectedRoute>}/>
                    <Route path="/*" element={<NotFound/>}/>
                    <Route path="/" element={<Main/>}/>
                </Routes>
            </div>
        </div>
        </CurrentUserContext.Provider>
    )
};
