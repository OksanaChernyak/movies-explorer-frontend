class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _handleError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(
            `Произошла ошибка ${res.status}, что-то поломалось. Сочувствуем:(`
        );
    }
    getMovies() {
        return fetch(`${this._baseUrl}${"/beatfilm-movies"}`, {
            method: "GET",
            headers: this._headers,
        }).then(this._handleError);
    }
}
export const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co",
    headers: {
        "Content-Type": "application/json",
    },
});