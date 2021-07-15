import { gql } from '@apollo/client';

export const ME = gql`
  query me{
    me {
      id
      username
      jobQueries {
        id, content, date
      },
      groups {
        id
        name
      }
    }
  }
`

export const FIND_USER = gql`
  query findUser($id: ID!){
    findUser (id: $id) {
      username,
      profile {
        about
      }
    }
  }
`

export const FIND_GROUP = gql`
  query findGroup($id: ID!) {
    findGroup(id: $id) {
      name
    }
  }
`

export const FIND_USER_OR_GROUP = gql`
  query findUserOrGroup($id: ID!) {
    findUserOrGroup(id: $id) {
        ... on User {
        id,
        username
      }
      ... on Group {
        id,
        name
      }
    }
  }
`


export const MY_ID = gql`
  query myId{
    me {
      id
    }
  }
`

export const CONVERSATION_INFOS = gql`
  query conversationInfos{
    me {
      conversations {
        id,
        users {
          username
          }
      }
    }
  }
`

export const FIND_CONVERSATION = gql`
  query findConversation($id: ID!) {
    findConversation(id: $id) {
      id, 
      users {
        id,
        username
      },
      messages {
        id
        sender {
          id
        }
        body 
      } 
    }
  }
`

export const ALL_JOBQUERIES = gql`
  query {
    allJobqueries  {
      id
      content
      date
      user {
        username
      }
    }
  }
`

export const ALL_USERS = gql`
  query {
    allUsers {
      id
      username 
      jobQueries {
        content
      }
    }
  }
`
