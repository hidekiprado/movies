import "./Home.css";
import { Container, Row, Card, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  byNameFetch,
  popularFetch,
  nowPlayingFetch,
  topRatedFetch,
  upComingFetch,
} from "../api/API";

const styles = {
  activeStyle: {
    color: "#02A3BC",
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
  },
};

function Home(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      if (props.menu === "popular") {
        const response = await popularFetch();
        setData(response);
      } else if (props.menu === "nowPlaying") {
        const response = await nowPlayingFetch();
        setData(response);
      } else if (props.menu === "topRated") {
        const response = await topRatedFetch();
        setData(response);
      } else if (props.menu === "upcoming") {
        const response = await upComingFetch();
        setData(response);
      } else {
        const response = await byNameFetch(props.search);
        setData(response);
      }
    }
    fetchData();
  }, [props]);

  return (
    <>
      <Container>
        <Row>
          <Nav className="justify-content-start">
            <NavLink
              to={"/popular"}
              style={({ isActive }) =>
                isActive ? styles.activeStyle : styles.defaultStyle
              }
            >
              Popular
            </NavLink>
            <NavLink
              to={"/nowPlaying"}
              className="nav-link"
              style={({ isActive }) =>
                isActive ? styles.activeStyle : styles.defaultStyle
              }
            >
              Now playing
            </NavLink>
            <NavLink
              to={"/topRated"}
              style={({ isActive }) =>
                isActive ? styles.activeStyle : styles.defaultStyle
              }
            >
              Top rated
            </NavLink>
            <NavLink
              to={"/upcoming"}
              style={({ isActive }) =>
                isActive ? styles.activeStyle : styles.defaultStyle
              }
            >
              Upcoming
            </NavLink>
          </Nav>

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
                      <Card.Title
                      // style={{
                      //   fontSize: "15px",
                      //   fontWeight: "bolder",
                      //   display: "flex",
                      //   justifyContent: "space-between",
                      // }}
                      >
                        {item.title}
                        <div
                          style={{
                            transform: `translate(40%, -40%)`,
                            fontSize: "12px",
                            borderRadius: "50px",
                            backgroundColor: "#831010",
                            width: "35px",
                            height: "30px",
                            padding: "6px",
                            boxShadow:
                              "rgb(197, 148, 148) 10px 0.2px 50px 0.1px",
                          }}
                        >
                          {item.vote_average.toFixed(1)}
                        </div>
                      </Card.Title>
                      <Card.Text>genres</Card.Text>
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
