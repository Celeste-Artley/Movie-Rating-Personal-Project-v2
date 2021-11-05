const EventEmitter = require("events");
const got = require("got");

const IMDBKEY = "68d4832c";

class movieAPI extends EventEmitter {
  constructor() {
    super();
  }
  getMovie(userSearch) {
    return got(
      "http://www.omdbapi.com/?s=" + userSearch + "&apikey=" + IMDBKEY
    );
  }
  searchByTitle(Title) {
    return got("http://www.omdbapi.com/?t=" + Title + "&apikey=" + IMDBKEY);
  }
  getMovieImgByTitle(Title) {
    return got("http://www.img.omdbapi.com/?t=" + Title + "&apikey=" + IMDBKEY);
  }
  getNTYPicksBy(Year) {
    return got(
      `https://api.nytimes.com/svc/movies/v2/reviews/search.json?critics-pick=y&publication-date=${Year}&api-key=${IMDBKEY}`
    );
  }
}
module.exports = movieAPI;
