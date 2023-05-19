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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };
  return (
    <>
      <Navbar
        className="navbar navbar-dark"
        style={{
          justifyContent: "space-between",
        }}
        expand="sm"
      >
        <Container>
          <div id="div_brand_input_together">
            <NavLink id="searchNavBar_brand" role={"a"} to={"/"}>
              Movies
            </NavLink>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                color="red"
                onChange={formControlHandler}
                onFocus={formControlHandler}
                onKeyDown={handleKeyDown}
              />
            </Form>
          </div>

          <Nav.Link
            id="searchNavBar_git"
            target="_blank"
            href="https://github.com/hidekiprado/movies"
          >
            {" "}
            Git
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
