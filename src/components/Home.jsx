import "./Home.css";
import { Container, Row, Card, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  byNameFetch,
  popularFetch,
  nowPlayingFetch,
  topRatedFetch,
  upComingFetch,
  genresFetch,
} from "../api/API";
import endPoints from "../constants/endPoints";

//menu bar style when active
// Popular, Now playing, Top rated, Upcoming
const styles = {
  activeStyle: {
    color: "#db0000",
    padding: "1em 1em",
    fontSize: "large",
    fontWeight: "600",
    transition: "1s",
    textShadow: "0.7px 0.7px #9fc3c896",
  },
  defaultStyle: {
    padding: "1em 1em",
    fontSize: "large",
    fontWeight: "600",
    transition: "1s",
    borderRadius: "2em",
    color: "white",
    borderLeft: "#ffffff",
    borderColor: "#ffffff",
  },
};

function Home(props) {
  //Data distribuition
  const [data, setData] = useState(null);
  const [endPoint, setendPoint] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    //fetching endpoints
    fetch(endPoints.home, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setendPoint(res))
      .catch((err) => err);

    //fetching data from API
    async function fetchData() {
      let response = "";
      //individual request for genres, only returns a list
      const genresObj = await genresFetch();
      // setGenresList(genresObj.genres);

      if (props.menu === "popular") {
        response = await popularFetch();
      } else if (props.menu === "nowPlaying") {
        response = await nowPlayingFetch();
      } else if (props.menu === "topRated") {
        response = await topRatedFetch();
      } else if (props.menu === "upcoming") {
        response = await upComingFetch();
      } else {
        response = await byNameFetch(props.search);
      }
      //adding genres names into moviesList
      response.results.forEach((movieIndividual) => {
        const newGenresList = [];
        movieIndividual.genre_ids.forEach((genreID) => {
          genresObj.genres.forEach((genreFromAPI) => {
            if (genreID === genreFromAPI.id) {
              newGenresList.push(genreFromAPI.name);
            }
          });
        });
        movieIndividual.genreList = newGenresList;
      });
      setData(response);
    }
    fetchData();
  }, [props]);

  //Nav sticky motion effects
  // Popular, Now playing, Top rated, Upcoming
  const [navSize, setnavSize] = useState("5rem");
  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 10
      ? setnavColor("rgb(16, 14, 14, 0.97)")
      : setnavColor("transparent");
    window.scrollY > 10 ? setnavSize("4rem") : setnavSize("5rem");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Navbar
            style={{
              backgroundColor: navColor,
              height: navSize,
              transition: "all 1s",
            }}
            sticky="top"
            id="navbar_menu"
            expand="sm"
            expanded={expanded}
          >
            <Navbar.Toggle
              onClick={() => setExpanded(!expanded)}
              aria-controls="navbarScroll"
            />
            <Navbar.Collapse id="navbarScroll">
              <Nav>
                {endPoint?.sections.map((section, index) => {
                  return (
                    <NavLink
                      key={index}
                      to={section.href}
                      style={({ isActive }) =>
                        isActive ? styles.activeStyle : styles.defaultStyle
                      }
                      onClick={() => setExpanded(false)}
                    >
                      {section.title}
                    </NavLink>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {data?.results.map((item, index) => {
            if (item.poster_path) {
              return (
                <Card key={index}>
                  <div>
                    <Card.Img
                      variant="top"
                      src={
                        "https://image.tmdb.org/t/p/original" + item.poster_path
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        {item.title}
                        <div className="score">
                          {item.vote_average.toFixed(1)}
                        </div>
                      </Card.Title>
                      <p className="genres">
                        {item.genreList.map((genre) => {
                          return ` ${genre},`;
                        })}
                      </p>
                    </Card.Body>
                  </div>
                </Card>
              );
            } else {
              return "";
            }
          })}
        </Row>
      </Container>
    </>
  );
}

export default Home;
