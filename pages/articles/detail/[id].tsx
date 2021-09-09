import { Button } from "@chakra-ui/button";
import { Container, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { getArticleById } from "../../../src/articles/data/articlesRepository";
import { ArticleWithContext } from "../../../src/articles/domain/ArticleWithContext";
import NextLink from "next/link";
import React from "react";

interface Props {
  context: ArticleWithContext;
}

export async function getServerSideProps({
  params,
}): Promise<{ props?: Props; notFound?: boolean }> {
  const { id } = params;
  const idNumber = parseInt(id, 10);
  if (!(typeof idNumber === "number")) {
    return {
      notFound: true,
    };
  }

  try {
    const context = await getArticleById(idNumber);
    return {
      props: {
        context,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function ArticleDetail({
  context: {
    article: { body, title, authors },
    previous,
    next,
  },
}: Props) {
  return (
    <>
      <header>
        <Container>
          <Spacer height={20} />
          <Heading as="h1" size="3xl">
            {title}
          </Heading>
          {authors?.length && (
            <Heading as="h2" size="md" color="gray.600">
              {authors?.join(", ")}
            </Heading>
          )}
          <Spacer height={24} />
        </Container>
      </header>
      <main>
        <Container>
          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </Container>
      </main>
      <footer>
        <Spacer height={24} />
        <Container>
          <Flex alignItems="center" justifyContent="space-between">
            {previous ? (
              <NextLink href={`/articles/detail/${previous}`}>
                <Button as="a">Previous article</Button>
              </NextLink>
            ) : (
              <div />
            )}
            {next && (
              <NextLink href={`/articles/detail/${next}`}>
                <Button as="a">Next article</Button>
              </NextLink>
            )}
          </Flex>
        </Container>
        <Spacer height={20} />
      </footer>
    </>
  );
}
