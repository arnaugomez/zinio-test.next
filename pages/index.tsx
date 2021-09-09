import {
  Heading,
  Container,
  VStack,
  StackDivider,
  Box,
  Text,
  Spacer,
} from "@chakra-ui/layout";
import Head from "next/head";
import React from "react";
import { getArticles } from "../src/articles/data/articlesRepository";
import { Article } from "../src/articles/domain/Article";

export interface Props {
  articles: Article[];
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const articles = await getArticles();
  return {
    props: {
      articles,
    },
  };
}

export default function Home({ articles }: Props) {
  return (
    <div>
      <Head>
        <title>Blog with articles</title>
        <meta name="description" content="All the articles of the blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Spacer height={20} />
        <Container>
          <Heading as="h1" size="4xl">
            The Hire Me Blog
          </Heading>
        </Container>
      </header>
      <main>
        <Container>
          <Heading as="h2" size="lg" color="gray.600">
            Latest articles
          </Heading>
          <Spacer height={24} />
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={7}
            align="stretch"
          >
            {articles.map(({ title, id, authors }) => (
              <Box key={id}>
                <Heading as="h3" size="lg">{title}</Heading>
                <Text>{authors?.join(", ")}</Text>
              </Box>
            ))}
          </VStack>
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}
