export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_TOKEN : process.env.EXPO_PUBLIC_MOVIE_READ_ACCESS_TOKEN,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_READ_ACCESS_TOKEN}`
    }
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTk3Mzc2ZjMxYTk5OTQ1OWQ1MjBhYjUwZjA3NjA4OCIsIm5iZiI6MTc2MTU3NTM2Mi42NzIsInN1YiI6IjY4ZmY4MWMyZjljYTdmYzY3ZmZiNzM5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Tugle2B65x3gl9eye6lD1d0BlkLHMNd3KrAWJVhy-A'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

export const fetchMovies = async ({ query}: {query: string}) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`

    const response = await fetch(endpoint,{
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    })

    if(!response.ok) {
        throw new Error (`Failed to fetch movies, ${response.statusText}`)
    }

    const data = await response.json();

    return data;
}