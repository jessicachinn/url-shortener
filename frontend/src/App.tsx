import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UrlShortener } from "./app/UrlShortener";
import { AppState } from "./app/reducer";
import { redirectFromShortUrl } from "./app/actions";
import styled from "styled-components";

const Container = styled.div`
  padding: 64px 0;
  text-align: center;
  font-family: sans-serif;
`;

const Heading = styled.h2``;
const Button = styled.button`
  font-size: 18px;
  border-radius: 4px;
  padding: 12px;
  margin: 30px;
  background-color: #1463ff;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

function App() {
  const dispatch = useDispatch();
  const originalUrl = useSelector((state: AppState) => state.originalUrl);
  const redirect = useSelector((state: AppState) => state.redirect);
  const redirectError = useSelector((state: AppState) => state.redirectError);
  const currentLocation = window.location.href;
  let show = false;

  if (currentLocation === "http://localhost:3000/" || redirectError) {
    show = true;
  }
  if (currentLocation !== "http://localhost:3000/") {
    dispatch(redirectFromShortUrl(window.location.href));
  }

  const doRedirect = () => {
    window.location.href = originalUrl;
  };

  const goHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div>
      {redirect ? (
        <Container>
          <Heading>
            Redirecting...
            {doRedirect()}
          </Heading>
        </Container>
      ) : (
        <div>
          {show ? (
            <div>
              {redirectError ? (
                <Container>
                  <Heading>Uh oh...this link doesn't exist...</Heading>
                  <Button onClick={goHome}>Shorten a new link</Button>
                </Container>
              ) : (
                <UrlShortener />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default App;
