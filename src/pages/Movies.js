import { useContext } from "react";
import { Col, Row } from "antd";
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
import _ from "lodash";

const searchTypes = [
  { value: "get:", label: "get" },
  { value: "rank:", label: "rank" },
];

export default function Movies() {
  const { state, dispatch } = useContext(MovieContext);
  const { movies, searchType, isQueryError, errorMessage, inputText } = state;

  const handleInputChange = (event) => {
    dispatch(setInputText(event.target.value));
    if (event.target.value == "") {
      dispatch(getAllMovies());
    }
  };

  const handleMenuChange = (value) => {
    dispatch(setSearchType(value));
  };

  const handleAlertClose = () => {
    dispatch(getAllMovies());
  };

  const handleMoviesFilter = (convertedObject) => {
    dispatch(getAllMovies());
    const filteredMovies = movies.filter((movie) => {
      for (const key in convertedObject) {
        if (
          isNaN(convertedObject[key]) &&
          !movie[key].toLowerCase().includes(convertedObject[key].toLowerCase())
        ) {
          return false;
        } else if (movie[key] != convertedObject[key]) {
          return false;
        }
      }
      return true;
    });

    return filteredMovies;
  };

  const handleMoviesSort = (convertedObject) => {
    dispatch(getAllMovies());
    const sortedMovies = [...movies];
    convertedObject.forEach(({ title, rank }) => {
      const movieIndex = sortedMovies.findIndex(
        (movie) => movie.Title === title
      );
      if (movieIndex !== -1) {
        const [movie] = sortedMovies.splice(movieIndex, 1);
        sortedMovies.splice(rank - 1, 0, movie);
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
            value={inputText}
          />
        </Col>
        <Col span={12}>
          {searchType === "get:" ? (
            <AlertMessage
              type="warning"
              message={"Type the Query as per this format `Year=2019`"}
            />
          ) : (
            <AlertMessage
              type="warning"
              message={
                "Type the Query as per this format `title='Knives Out'&rank=1&title='They Shall Not Grow Old'&rank=2`"
              }
              desc={""}
            />
          )}
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
