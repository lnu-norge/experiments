import React from 'react';
import logo from './logo.svg';
import './App.css';
import { gql, useQuery, ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://backend.lokaler.lnu.test/v1/graphql'
    }),
    cache: new InMemoryCache(),
  });
 };

/** Test data, based on having an animal_types enum table */
const GET_ALL_ANIMAL_TYPES = gql`query AllAnimalTypes {
  animal_types {
    type
  }
}`

const ListAllAnimalTypes = () => {
  const {loading, error, data} = useQuery(GET_ALL_ANIMAL_TYPES)
  if (loading) {
    return <>Loading...</>
  }
  if (error) {
    console.error(error)
    return <>Error! {error.message}</>
  }
  return <>{JSON.stringify(data)}</>
}

function App() {

  const client = createApolloClient();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Foo <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
        <ApolloProvider client={client}>
          <div>Apollo testing</div>
          <ListAllAnimalTypes />
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;
