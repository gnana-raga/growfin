import { useContext } from "react";
import { Col, Row, Space } from "antd";
import { MovieCard, SelectMenu, InputQuery, AlertMessage } from "../components";
import {
  MovieContext,
  getAllMovies,
  getMovies,
  setError,
  setInputText,
  setSearchType,
} from "../context";
import { convertQueryToObject, convertQueryToRank } from "../utils/query";

export default function Movies() {
  const { state, dispatch } = useContext(MovieContext);
  const { movies, searchType, searchTypes, isQueryError, errorMessage } = state;

  const handleInputChange = (event) => {
    dispatch(setInputText(event.target.value));
    if (event.target.value == "") {
      dispatch(getAllMovies());
    }
    // dispatch({ type: "SET_INPUT_TEXT", payload: event.target.value });
  };

  const handleMenuChange = (value) => {
    dispatch(setSearchType(value));
    // dispatch({ type: "SET_SEARCH_TYPE", payload: value });
  };

  const handleAlertClose = () => {
    dispatch(getAllMovies());
    // dispatch({ type: "GET_ALL_MOVIES" });
  };

  const handleMoviesFilter = (convertedObject) => {
    dispatch(getAllMovies());
    const filteredMovies = movies.filter((movie) => {
      for (const key in convertedObject) {
        const capitalizedStr = key.charAt(0).toUpperCase() + key.slice(1);
        console.log("movie[key]", movie[key]);
        console.log("convertedObject[key]", convertedObject[key]);
        if (
          movie[key] != convertedObject[key] ||
          movie[capitalizedStr] != convertedObject[key]
        ) {
          return false;
        }
      }
      return true;
    });

    return filteredMovies;
  };

  const handleMoviesSort = (convertedObject) => {
    dispatch(getAllMovies());
    const sortedObject = convertedObject.sort((a, b) => {
      const rankA = parseInt(a.rank);
      const rankB = parseInt(b.rank);
      if (isNaN(rankA) || isNaN(rankB)) {
        return isNaN(rankA) ? 1 : -1;
      }
      return rankA - rankB;
    });
    const sortedMovies = [];
    sortedObject.forEach((params) =>
      movies.map((movie) => {
        if (movie.Title == params.title) {
          sortedMovies.push(movie);
        }
      })
    );
    movies.forEach((movie) => {
      const found = sortedMovies.some((objA) => objA.Title === movie.Title);
      if (!found) {
        sortedMovies.push(movie);
      }
    });
    return sortedMovies;
  };

  const handleKeyDown = (event) => {
    if (event.target.value.split(" ").join("")) {
      if (event.key === "Enter") {
        if (searchType === "get:") {
          const convertedObject = convertQueryToObject(event.target.value);
          const filtereddata = handleMoviesFilter(convertedObject);
          dispatch(getMovies(filtereddata));
        }
        if (searchType === "rank:") {
          const convertedObject = convertQueryToRank(event.target.value);
          if (convertedObject) {
            const sortedData = handleMoviesSort(convertedObject);
            dispatch(getMovies(sortedData));
          } else {
            dispatch(setError("Rank Query Is Invalid"));
          }
        }
      }
    } else {
      dispatch(getAllMovies());
    }
  };

  return (
    <>
      <Row gutter={[21, 21]} style={{ marginBottom: "3%" }}>
        <Col span={4}>
          <SelectMenu menu={searchTypes} onChange={handleMenuChange} />
        </Col>
        <Col span={8}>
          <InputQuery
            addOn={searchType}
            setInputText={handleInputChange}
            onKeyPress={handleKeyDown}
          />
        </Col>
      </Row>
      {isQueryError && (
        <AlertMessage
          type={"error"}
          message={"Error"}
          desc={errorMessage}
          onClose={handleAlertClose}
        />
      )}
      <Row
        gutter={[21, 21]}
        justify="space-between"
        style={{ marginTop: "5%" }}
      >
        {movies.length != 0 &&
          movies.map((movie) => {
            return (
              <Col key={movie.imdbID} span={7}>
                <MovieCard movie={movie} />
              </Col>
            );
          })}
      </Row>
    </>
  );
}
