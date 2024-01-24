import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieDetail from "../../components/movie/movieDetail/MovieDetail";
import Seasons from "../../components/movie/seasons/Seasons";
import { useParams } from "react-router-dom";
import {
  fetchMovies,
  selectAllMovies,
  selectIsLoading,
} from "../../redux/MovieSlice";
import { fetchSeries, selectAllSeasons } from "../../redux/SeasonsSlice";
import { selectAllSearch } from "../../redux/SearchSlice";
import Navbar from "../../components/navbar/Navbar";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/Store";

export default function Movie() {
  const { movieId } = useParams();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const movies: Movie[] = useSelector(selectAllMovies);
  const seasons: Season[] = useSelector(selectAllSeasons);
  const searchs: Search[] = useSelector(selectAllSearch);
  const [movieData, setMovieData] = useState<Movie | Season | Search | null>(
    null
  );
  interface Movie {
    id: number;
    vote_average: number;
    poster_path: string;
    name: string;
    original_title: string;
    backdrop_path: string;
    overview: string;
  }

  interface Season {
    id: number;
    vote_average: number;
    poster_path: string;
    name: string;
    original_title: string;
    backdrop_path: string;
    overview: string;
  }

  interface Search {
    id: number;
    vote_average: number;
    poster_path: string;
    name: string;
    original_title: string;
    backdrop_path: string;
    overview: string;
  }

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  useEffect(() => {
    const matchedMovie = movies.find(
      (movie) => movie.id.toString() === movieId
    );
    const matchedSeries = seasons.find(
      (seasons) => seasons.id.toString() === movieId
    );
    const matchedSearch = searchs.find(
      (search) => search.id.toString() === movieId
    );

    if (matchedMovie) {
      setMovieData(matchedMovie);
    }
    if (matchedSeries) {
      setMovieData(matchedSeries);
    }
    if (matchedSearch) {
      setMovieData(matchedSearch);
    }
  }, [movies, seasons, , searchs, movieId]);
  if (movieData === null) {
    return <div>Id Data Not Found</div>;
  }

  return (
    <>
      <Navbar
        showSearchButton={true}
        searchPlaceholder={"🔍 Search Movie Or Series"}
        onSearchChange={function (query: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* Movie Detail */}
      <div className="container p-4 ">
        <MovieDetail />
      </div>
      <Seasons />
    </>
  );
}