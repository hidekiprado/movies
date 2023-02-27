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
} from "../api/API";

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

  //Nav sticky motion effects
  // Popular, Now playing, Top rated, Upcoming
  const [navSize, setnavSize] = useState("5rem");
  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 10
      ? setnavColor("rgb(0, 0, 0, 0.95)")
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
          >
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav>
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
