import React, { useContext } from "react";
import { Context } from "../index";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const NavBar = observer( () => {
  const { user } = useContext(Context)
  const history = useHistory()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: 80, fontSize: 26 }}>
        <Container>
          <NavLink
            style={{ color: "white", textDecoration: "none" }}
            to={SHOP_ROUTE}
          >
            eCommerce
          </NavLink>
          {user.isAuth ? 
            <Nav className="ms-auto" style={{ color: "white" }}>
              <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>
                ADMIN
              </Button>

              <Button
                variant={"outline-light"}
                onClick={() => logOut()}
                className="ms-2"
              >
                SIGN OUT
              </Button>
            </Nav>
           : 
            <Nav className="ms-auto" style={{ color: "white" }}>
              <Button
                variant={"outline-light"}
                onClick={() => history.push(LOGIN_ROUTE)}
              >
                SIGN IN
              </Button>
            </Nav>
          }
        </Container>
      </Navbar>
    </div>
  );
} );

export default NavBar;
