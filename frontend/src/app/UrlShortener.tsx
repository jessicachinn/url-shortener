import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createShortUrl } from './actions';
import { AppState } from './reducer';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';

const Container = styled.div`
    padding: 64px;
    margin: auto;
    width: 55%;
    font-family: sans-serif;
`;

const SubContainer = styled.div`
    padding: 24px 0 0;
    width: 55%;
`;

const SubFlex = styled.div`
    display: flex;
`;

const Heading = styled.h2``;

const SubHeading = styled.h4``;

const Form = styled.form`
    display: flex;
`;

const Input = styled.input`
    font-size: 18px;
    border-radius: 4px;
    width: 80%;
    padding: 12px;
    border: solid 1px;
`;

const Button = styled.button`
    font-size: 18px;
    border-radius: 4px;
    width: 20%;
    padding: 12px;
    margin-left: 12px;
    background-color: #1463ff;
    color: white;
    border: none;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export function UrlShortener() {
    let urlInput = '';
    const dispatch = useDispatch();

    const originalUrl = useSelector((state: AppState) => state.originalUrl);
    const linkCreated = useSelector((state: AppState) => state.linkCreated);
    const shortUrl = useSelector((state: AppState) => state.shortUrl);

    const handleChange = (e: any) => {
        urlInput = e.target.value;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(createShortUrl(urlInput));
        e.target.reset();
    };

    return (
        <Container>
            <Heading>Url Shortener</Heading>
            <Form onSubmit={handleSubmit}>
                <Input
                    onChange={(e) => handleChange(e)}
                    placeholder="Shorten your link"
                />
                <Button type="submit">Submit</Button>
            </Form>
            {linkCreated ? (
                <SubContainer>
                    <Heading>Your Shortened Link</Heading>
                    <SubFlex>
                        <Input value={shortUrl} />
                        <Button onClick={() => copy(shortUrl)}>Copy</Button>
                    </SubFlex>
                    <SubHeading>Original URL</SubHeading>
                    {originalUrl}
                </SubContainer>
            ) : (
                ''
            )}
        </Container>
    );
}
