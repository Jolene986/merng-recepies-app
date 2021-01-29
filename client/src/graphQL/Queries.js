import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query postList($after: String) {
    posts(after: $after) {
      cursor
      hasMore
      posts {
        title
        category
        cursor
        id
      }
    }
  }
`;
