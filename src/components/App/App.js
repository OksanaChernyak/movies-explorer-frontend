import "./App.css";
import {useState, useEffect} from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import InfoPopup from "../InfoPopup/InfoPopup";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import * as mainApi from "../../utils/MainApi";
import {moviesApi} from "../../utils/MoviesApi";
import {CONFLICTING_REQUEST, UNAUTHORIZED} from "../../utils/errors";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../utils/ProtectedRoute";
import Preloader from "../Preloader/Preloader";


export default App;

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [user, setUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [apiItems, setApiItems] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPreloaderActive, setIsPreloaderActive] = useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [notification, setNotification] = useState({text: ""});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        tokenCheck()
    }, []);

    useEffect(() => {
        if (loggedIn) {
            navigate("/movies")
        }
    }, [loggedIn]);

    useEffect(() => {
        mainApi.getUserData()
            .then((user) => {
                setLoggedIn(true)
                setCurrentUser(user);
                getMoviesFromApi();
                getMySavedMovies(user._id);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [user]);


   //функция регистрации
    const handleRegister = ({name, email, password}) => {
        setIsPreloaderActive(true);
        mainApi.register({name, email, password})
            .then((res) => {
                if (res) {
                    handleLogin({email: email, password: password});
                    setIsInfoPopupOpen(true);
                    setNotification({text: "Вы успешно зарегистрировались!"});
                    setUser({name: name, email: email});
                }
            })
            .catch((err) => {
                setIsPreloaderActive(false);
                setIsInfoPopupOpen(true);
                {
                    (err.status === CONFLICTING_REQUEST)
                        ? setNotification({text: "Пользователь с таким email уже существует"})
                        : setNotification({text: "При обновлении профиля произошла ошибка."})
                }
                ;
            })
    };
   //функция логина
    const handleLogin = ({email, password}) => {
        setIsPreloaderActive(true);
        mainApi.login({email, password})
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setUser({name: res.name, email: res.email});
                    setLoggedIn(true);
                    navigate("/movies");
                    setIsPreloaderActive(false);
                }
            })
            .catch((err) => {
                setIsPreloaderActive(false);
                setIsInfoPopupOpen(true);
                console.log(err);
                {
                    (err.status === UNAUTHORIZED)
                        ? setNotification({text: "Вы ввели неправильный логин или пароль."})
                        : setNotification({text: "На сервере произошла ошибка"})
                }
                ;
            })
    };
   //выход из профиля
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("shortie");
        localStorage.removeItem("liked");
        localStorage.removeItem("mySearch");
        localStorage.removeItem("movies");
        localStorage.clear();
        setCurrentUser({});
        setApiItems([]);
        setSavedMovies([]);
        setLoggedIn(false);

        navigate("/");
    };
    // при изменении профиля что происходит
    const handleChangeProfile = (user) => {
        setIsPreloaderActive(true);
        tokenCheck();

        mainApi.changeUserData(user)
            .then((res) => {
                setCurrentUser(res);
                setIsPreloaderActive(false);
                setIsInfoPopupOpen(true);
                setNotification({text: "Вы успешно изменили данные пользователя!"});
            })
            .catch((err) => {
                setIsPreloaderActive(false);
                setIsInfoPopupOpen(true);
                {
                    (err.status === CONFLICTING_REQUEST)
                        ? setNotification({text: "Пользователь с таким email уже существует"})
                        : setNotification({text: "При обновлении профиля произошла ошибка."})
                }
                ;
            });
    };
    //есть ли токен в хранилище
    const tokenCheck = () => {
        let token = localStorage.getItem("token");
        if (token) {
            mainApi.getContent(token)
                .then((res) => {
                    setCurrentUser(res);
                    setLoggedIn(true);
                    navigate(location)
                })
                .catch((err) => {
                    console.log(err)
                    setIsInfoPopupOpen(true);
                    setNotification({text: "Переданный токен некорректен. Вам отказано в доступе"})
                    handleLogout();
                })
        } else {
            handleLogout();
            setIsInfoPopupOpen(true);
            setNotification({text: "Переданный токен некорректен. Вам отказано в доступе"})
        }
    }
    //получим массив со стороннего апи
    const getMoviesFromApi = () => {
        setIsPreloaderActive(true);
         moviesApi.getMovies().then(
            (apiItems) => {
                if (apiItems) {
                    setApiItems(apiItems);
                    localStorage.setItem("movies", JSON.stringify(apiItems));
                    setIsPreloaderActive(false);
                } else {
                    setIsInfoPopupOpen(true);
                    setNotification({text: "Ничего не найдено"});
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // получим сохраненные фильмы
    const getMySavedMovies = (user) => {
        tokenCheck();
        mainApi.getMovies().then((res) => {
            setSavedMovies(res.filter((m) => m.owner === user));
            localStorage.setItem(
                "liked",
                JSON.stringify(res.filter((m) => m.owner === user))
            );
        })
            .catch((err) => {
                console.log(err)
            })
    }
    // обработка попадания в сохраненные
    const handleMovieLike = (someMovie) => {
        const likedMovie = savedMovies.find((m) => m.movieId === someMovie.id);
        if (!someMovie.trailerLink.startsWith('http')) {
            someMovie.trailerLink = "https://www.youtube.com/watch?v=D220J3AR-E8"
        } else if (someMovie.nameEN === undefined) {
            someMovie.nameEN = "noName"
        }
        tokenCheck();
        (likedMovie) ? handleMovieDelete(likedMovie) :
            mainApi.addMovie(someMovie).then((res) => {
                setSavedMovies((savedMovies) => [...savedMovies, res
                ]);
                localStorage.setItem(
                    "liked",
                    JSON.stringify([...savedMovies, res])
                );
            }).catch(
                (err) => {
                    console.log(err);

                }
            )
    }
    //обработка удаления
    const handleMovieDelete = (someMovie) => {
        tokenCheck();
        savedMovies.map(
            (m) => {
                if (m._id === someMovie) {
                    mainApi.deleteMovie(someMovie)
                        .then((res) => {
                            setSavedMovies(savedMovies.filter(m => m._id !== someMovie));
                            console.log(someMovie)
                            localStorage.getItem(
                                "liked",
                                savedMovies.filter(m => m._id !== someMovie)
                            );
                            isLiked(someMovie)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
    }
    // функция для пробрасывания лайкнутости в фильмы и сохраненные фильмы - нашли есть ли подходящие элементы - значит тру
    const isLiked = (movie) => {
        return savedMovies.some(m => m.movieId === movie.id)
    }

    //закрытие инфо-попапа
    const closeInfoPopup = () => {
        setIsInfoPopupOpen(false);
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
                               element={<ProtectedRoute path="/movies" loggedIn={loggedIn}><Movies apiItems={apiItems}
                                                                                                   isPreloaderActive={isPreloaderActive}
                                                                                                   isMovies={true}
                                                                                                   isLiked={isLiked}
                                                                                                   savedMovies={savedMovies}
                                                                                                   handleMovieLike={handleMovieLike}
                                                                                                   handleMovieDelete={handleMovieDelete}
                               /></ProtectedRoute>}/>
                        <Route path="/saved-movies"
                               element={<ProtectedRoute path="/saved-movies" loggedIn={loggedIn}><SavedMovies
                                   savedMovies={savedMovies} isLiked={isLiked} isMovies={false} handleMovieDelete={handleMovieDelete}
                               /></ProtectedRoute>}/>
                        <Route path="/profile"
                               element={<ProtectedRoute path="/profile" loggedIn={loggedIn}><Profile
                                   profile={currentUser} handleLogout={handleLogout}
                                   handleChangeProfile={handleChangeProfile}/></ProtectedRoute>}/>
                        <Route path="/*" element={<NotFound/>}/>
                        <Route path="/" element={<Main loggedIn={loggedIn}/>}/>

                    </Routes>
                    <Preloader isPreloaderActive={isPreloaderActive}/>
                    <InfoPopup isOpen={isInfoPopupOpen} onClose={closeInfoPopup} notification={notification}/>

                </div>
            </div>
        </CurrentUserContext.Provider>
    )
};
