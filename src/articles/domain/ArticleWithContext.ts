import { Article } from "./Article";

export interface ArticleWithContext {
  article: Article;
  /** Id of the previous article */
  previous?: number;
  /** Id of the next article */
  next?: number;
}
