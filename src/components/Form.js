import { React, useState, useContext } from "react";
import Input from "./Input";
import { ContainerForm } from "./styled/containers/ContainerForm";
import { StyledForm } from "./styled/StyledForm";
import MoviesContext from "../MoviesContext";
import { Button } from "@mui/material";

import Backdrop from "./Backdrop";
import AddImgURLModal from "./AddImgURLModal";

export default function Form(props) {
  //Udělat přes state object?
  const [newTitle, setNewTitle] = useState();
  const [newMovieYear, setNewMovieYear] = useState();
  const [newDateWatched, setNewDateWatched] = useState();

  const [movieToBeAdded, setMovieToBeAdded] = useState({});
  const [addImgDisplay, setAddImgDisplay] = useState(false);

  const { addToMovies, movies } = useContext(MoviesContext);

  const onChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const onChangeDateFilmed = (e) => {
    setNewMovieYear(e.target.value);
  };
  const onChangeDateWatched = (e) => {
    setNewDateWatched(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const movieItem = {
      id: Math.random().toString(),
      title: newTitle,
      movieYear: newMovieYear,
      dateWatched: newDateWatched,
      stars_1: "",
      stars_2: "",
    };
    /* addToMovies(movieItem); */
    setMovieToBeAdded(movieItem);
    setAddImgDisplay(true);
  };

  const backToMainPage = () => {
    props.addMovieState("PICK");
  };

  const backToAddMovie = () => {
    setAddImgDisplay(false);
  };

  return (
    <ContainerForm>
      <StyledForm>
        <div className="inputs-container">
          <form onSubmit={onSubmitForm}>
            <Input
              label="Movie name"
              input={{
                id: "Movie name",
                type: "text",
              }}
              value={newTitle}
              onChangeInput={onChangeTitle}
              placeholder="Harry Potter"
            />
            <Input
              label="Year filmed"
              input={{
                id: "Year filmed",
                type: "number",
                min: "1900",
                max: "2022",
                step: "1",
              }}
              value={newMovieYear}
              onChangeInput={onChangeDateFilmed}
              defaultValue="2021"
            />
            <Input
              label="Date watched"
              input={{
                id: "Date watched",
                type: "date",
              }}
              value={newDateWatched}
              onChangeInput={onChangeDateWatched}
              defaultValue="1992-10-31"
            />
            <Button variant="contained" type="submit">
              Add Movie
            </Button>
            <Button variant="outlined" color="error" onClick={backToMainPage}>
              Back
            </Button>
          </form>
        </div>

        {addImgDisplay == true ? (
          <Backdrop>
            <AddImgURLModal
              movieToBeAdded={movieToBeAdded}
              displayImgModalToggle={setAddImgDisplay}
              backToAddMovie={backToAddMovie}
            />
          </Backdrop>
        ) : (
          ""
        )}
      </StyledForm>
    </ContainerForm>
  );
}
