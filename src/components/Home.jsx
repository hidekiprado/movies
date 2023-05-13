import "./Home.css";
import { Container, Row, Card, Nav, Navbar } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
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
  //Nav sticky motion effects
  const [navSize, setnavSize] = useState("5rem");
  const [navColor, setnavColor] = useState("transparent");

  useEffect(() => {
    // Popular, Now playing, Top rated, Upcoming
    const listenScrollEvent = () => {
      window.scrollY > 10
        ? setnavColor("rgb(16, 14, 14, 0.97)")
        : setnavColor("transparent");
      window.scrollY > 10 ? setnavSize("4rem") : setnavSize("5rem");
    };
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
      switch (props.menu) {
        case "popular":
          response = await popularFetch();
          break;
        case "nowPlaying":
          response = await nowPlayingFetch();
          break;
        case "topRated":
          response = await topRatedFetch();
          break;
        case "upcoming":
          response = await upComingFetch();
          break;
        default:
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
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, [props]);

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
                      className="menuIcon"
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
          {data ? (
            data.results.map((item, index) =>
              item.poster_path ? (
                <Card key={index}>
                  <Fade>
                    <div>
                      <Card.Img
                        variant="top"
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          item.poster_path
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
                  </Fade>
                </Card>
              ) : (
                ""
              )
            )
          ) : (
            <div className="divLoader">
              <div className="loader"></div>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Home;
