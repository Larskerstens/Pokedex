import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Input,
  Heading,
  Button,
  ButtonGroup,
  FormControl,
  ListItem,
  UnorderedList,
  Alert,
  Image,
  Link,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './css/style.css';
import axios from 'axios';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const inputOnChange = e => setSearchInput(e.target.value);
  const [searchedPokemon, setSearchedPokemon] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    //console.log('pressed button');
    setSearchedPokemon(searchInput);
  };
  const [pokemons, setPokemons] = useState('');
  const [allPokemons, setAllPokemons] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showAllPokemon, setShowAllPokemon] = useState(false);
  const showAll = () => {
    setShowAllPokemon(true);
    //console.log(allPokemons);
    //console.log(pokemons);
  };

  useEffect(() => {
    if (searchedPokemon) {
      setLoading(true);
      setError(false);
      axios(
        ///${searchedPokemon}?offset=0&limit=900
        `https://pokeapi.co/api/v2/pokemon-species/${searchedPokemon}`
      )
        .then(response => {
          //console.log(response.data.results);
          setPokemons(response);
          setSearchInput('');
          console.log(response.config.url);
          setShowAllPokemon(false);
        })
        .catch(error => setError(true))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchedPokemon]);

  useEffect(() => {
    if (showAllPokemon) {
      setLoading(true);
      setError(false);
      axios(
        ///${searchedPokemon}?offset=0&limit=900
        `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=900`
      )
        .then(response => {
          setAllPokemons(response.data.results);
          //console.log(response.data);
          //console.log(response);
          setPokemons('');
        })
        .catch(error => setError(true))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [showAllPokemon]);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Flex alignItems="center" justifyContent="center">
            <Flex direction="column" rounded={6}>
              <Heading mb={2}>Pokédex</Heading>
              <Heading mb={2}>Je zocht voor: {searchInput}</Heading>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Input
                    type="text"
                    value={searchInput}
                    onChange={inputOnChange}
                    variant="filled"
                    mb={5}
                    size="lg"
                    textAlign="center"
                  />
                  <ButtonGroup variant="outline" spacing="6">
                    <Button colorScheme="red" variant="outline" type="submit">
                      Zoek je pokémon
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={showAll}
                    >
                      Geef alle pokémons
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup variant="ghost" spacing="2" mt="4" size="sm">
                    <Button colorScheme="red">Gen I</Button>
                    <Button colorScheme="red">Gen II</Button>
                    <Button colorScheme="red">Gen III</Button>
                    <Button colorScheme="red">Gen IV</Button>
                  </ButtonGroup>
                  <ButtonGroup variant="ghost" spacing="2" mt="4" size="sm">
                    <Button colorScheme="red">Gen V</Button>
                    <Button colorScheme="red">Gen VI</Button>
                    <Button colorScheme="red">Gen VII</Button>
                    <Button colorScheme="red">Gen VIII</Button>
                  </ButtonGroup>
                </FormControl>
              </form>
              <Flex alignItems="center" justifyContent="center" mt={15}>
                {error && (
                  <Alert status="error">Je Pokédex is even kapot</Alert>
                )}
                {loading && (
                  <Alert status="info">
                    Je Pokédex heeft even tijd nodig om je Pokémon te vinden
                  </Alert>
                )}
                {pokemons && (
                  <UnorderedList>
                    <Flex flexDirection="column" alignItems="center">
                      <Image
                        boxSize="75px"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/151.png"
                        alt={pokemons.data.name}
                      />
                      <ListItem key="allPokemon.id">
                        {pokemons.data.id}. {pokemons.data.name}
                      </ListItem>
                    </Flex>
                  </UnorderedList>
                )}
                {allPokemons && (
                  <UnorderedList>
                    <Grid templateColumns="repeat(7, 1fr)" gap={4}>
                      {allPokemons.map((allPokemon, index) => (
                        <>
                          <Flex flexDirection="column" alignItems="center">
                            <Image
                              boxSize="75px"
                              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png"
                              // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/
                              alt={allPokemon.name}
                            />
                            <ListItem key={index}>
                              {index + 1}. {allPokemon.name}
                            </ListItem>
                          </Flex>
                        </>
                      ))}
                    </Grid>
                  </UnorderedList>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
