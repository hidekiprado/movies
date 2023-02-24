import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();

  const formControlHandler = (e) => {
    if (e.target.value.length > 1) {
      props.searchFromNav(e.target.value);
      navigate("/");
    } else {
      props.searchFromNav("a");
    }
  };
  return (
    <>
      <Navbar
        sticky="top"
        style={{ backgroundColor: "#0B0202", color: "black" }}
        expand="sm"
      >
        <Container>
          <NavLink
            role={"a"}
            to={"/"}
            style={{ fontSize: "2rem", color: "#db0000" }}
          >
            Movies
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                color="red"
                onChange={formControlHandler}
              />
            </Form>
            <Nav
              className="justify-content-end"
              style={{ maxHeight: "100px", width: "70%" }}
              navbarScroll
            >
              <Nav.Link href="#action1">git </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
