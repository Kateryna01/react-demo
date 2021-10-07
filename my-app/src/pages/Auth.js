import React, { useContext, useState, useEffect } from "react";
import { Card, Container, Form, Button, FormControl } from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("required field");
  const [passwordError, setPasswordError] = useState("required field");
  const [formValid, setFormValid] = useState(false);

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 5 || e.target.value.length > 10) {
      setPasswordError("Password must be between 5-10 characters");
      if (!e.target.value) {
        setPasswordError("required field");
      }
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      history.push(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center "
      style={{ height: window.innerHeight - 54 }}
    >
      <Card
        style={{ width: 600 }}
        border="secondary"
        className="p-5"
        bg={"info"}
        text={"light"}
      >
        <h2 className="m-auto ">
          {isLogin ? "SIGN IN" : "Create your account"}
        </h2>
        <Form className="d-flex flex-column">
          {(emailDirty && emailError) && <div style={{color:"red"}}>{emailError}</div>}
          <FormControl
            name="email"
            type="email"
            className="mt-2 mb-2"
            placeholder="email"
            value={email}
            onChange={(e) => handleEmail(e)}
            onBlur={(e) => handleBlur(e)}
          />
          {(passwordDirty && passwordError) && <div style={{color:"red"}}>{passwordError}</div>}
          <FormControl
            name="password"
            type="password"
            className="mt-3 mb-2"
            placeholder="password"
            value={password}
            onChange={(e) => handlePassword(e)}
            onBlur={(e) => handleBlur(e)}
          />

          <Container className="d-flex justify-content-between align-items-center">
            <Button 
            disabled={!formValid}
            className="mt-3" 
            variant="secondary" 
            onClick={click}>
              {isLogin ? "SIGN IN" : "Create account"}
            </Button>
            {isLogin ? (
              <span style={{ fontSize: 20 }}>
                
                Don't have an account?
                <NavLink style={{ color: "gray", textDecoration:"none"}} to={REGISTRATION_ROUTE}>
                 {" "} Create account
                </NavLink>
              </span>) 
              : 
              (<span style={{ fontSize: 20 }}>
                
                Already have an account?
                <NavLink style={{ color: "gray", textDecoration:"none"}} to={LOGIN_ROUTE}>
                 {" "} SiGN IN
                </NavLink>
              </span>
            )}
          </Container>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
