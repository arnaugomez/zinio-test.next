import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Link,
  Spacer,
  StackDivider,
  VStack,
  Text,
} from "@chakra-ui/layout";
import { Article } from "../../src/articles/domain/Article";
import NextLink from "next/link";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce, DebouncedFunc, throttle } from "lodash";
import { searchArticles } from "../../src/articles/data/articlesRepository";
import { Spinner } from "@chakra-ui/spinner";

export default function ArticleSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSearchResults() {
    setIsLoading(true);
    const searchResults = await searchArticles(searchText);
    setIsLoading(false);
    setSearchResults(searchResults);
  }

  function debounceSearchResults() {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      fetchSearchResults();
    }, 800);
    setDebounceTimeout(timeout);
  }

  useEffect(() => {
    if (searchText.length > 2) {
      debounceSearchResults();
    } else if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
  }, [searchText, setSearchResults]);

  return (
    <>
      <header>
        <Container>
          <Spacer height={20} />
          <Heading as="h1" size="3xl" marginBottom={2}>
            Search articles
          </Heading>
          <Heading as="h2" size="md" color="gray.600">
            With fuzzy search
          </Heading>
          <Spacer height={24} />
        </Container>
      </header>
      <main>
        <Container>
          <Spacer height={24} />
          <InputGroup>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Behold the search bar"
            />
            <InputRightAddon>
              {isLoading ? <Spinner /> : <SearchIcon />}
            </InputRightAddon>
          </InputGroup>
          <Spacer height={10} />
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={7}
            align="stretch"
          >
            {searchResults.map(({ title, id, authors }) => (
              <Box key={id}>
                <Heading as="h3" size="lg">
                  <NextLink href={`articles/detail/${id}`} passHref>
                    <Link>{title}</Link>
                  </NextLink>
                </Heading>
                <Text>{authors?.join(", ")}</Text>
              </Box>
            ))}
          </VStack>
        </Container>
      </main>
      <footer>
        <Spacer height={20} />
      </footer>
    </>
  );
}
