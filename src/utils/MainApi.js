const BASE_URL = 'https://oksanamovies.nomoredomains.sbs';
const BASE_URL_BACK = 'https://api.oksanamovies.nomoredomains.sbs';
const checkRes = (response) => {
    return response.ok ? response.json() : Promise.reject(` У нас все поломалось: ${response.status}`)
}

//user
export const getUserData = () => {
    return fetch(`${BASE_URL_BACK}${"/users/me"}`, {
        method: "GET",
        headers: {
            'Content-Type':
                'application/json',
            Authorization:
                `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(checkRes);
};
export const changeUserData = ({name, email}) => {
    return fetch(`${BASE_URL_BACK}${"/users/me"}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email
        })
    })
        .then(checkRes);
};

//authorization
export const register = ({name, email, password}) => {
    return fetch(`${BASE_URL_BACK}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, password
        })
    })
        .then(checkRes);
};
export const login = ({email, password}) => {
    return fetch(`${BASE_URL_BACK}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(checkRes)
};
export const getContent = (token) => {
    return fetch(`${BASE_URL_BACK}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type':
                'application/json',
            Authorization:
                `Bearer ${token}`
        }
    })
        .then(checkRes)
}

//movies
export const getMovies = (token) => {
    return fetch(`${BASE_URL_BACK}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type':
                'application/json',
            Authorization:
                `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(checkRes);
};

export const postMovie = (movie) => {
    return fetch(`${BASE_URL_BACK}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            movie
        })
    })
        .then(checkRes);
};

export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL_BACK}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(checkRes);
};