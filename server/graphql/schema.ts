const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type Category {
    id: ID!
    name: String!
    parent: Category
    children: [Category]
  }

  type Message {
    id: ID!
    body: String
    sender: User!
  }

  type Conversation {
    id: ID!
    users: [User]!
    messages: [Message]!
  }

  type Jobquery {
    id: ID!
    content: String!
    date: Date!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    passwordHash: String!
    jobQueries: [Jobquery]!
    conversations: [Conversation]!
    profile: UserProfile!
    groups: [Group]!
  }

  type Group {
    id: ID!
    name: String!
    users: [User!]!
    profile: GroupProfile!
    jobQueries: [Jobquery]!
    conversations: [Conversation]!
  }

  type UserProfile {
    id: ID!
    user: User!
    about: String,
    image: String,
    skills: [Category]
  }

  type GroupProfile {
    id: ID!
    group: Group!
    about: String
  }

  type Token {
    value: String!,
    id: ID!
  }

  union UserOrGroup = User | Group

  type Query {
    allJobqueries: [Jobquery]
    allUsers: [User]!
    allGroups: [Group]!
    allUserProfiles: [UserProfile]!
    findJobqueries(content: String!): [Jobquery],
    findUser(id: ID!): User
    findGroup(id: ID!): Group
    findUserOrGroup(id: ID!): UserOrGroup
    allConversations: [Conversation]
    findConversation(id: ID!): Conversation
    allCategories: [Category]
    me: User,
  }

  type Mutation {
    createUser(
      username: String!,
      password: String!
    ): User
    createUserProfile(
      skills: [ID]!,
      about: String!,
      image: String
    ): UserProfile
    login(
      username: String!
      password: String!
    ): Token
    editUserProfile(
      about: String
    ): UserProfile
    createGroup(
      name: String!,
      users: [ID!]!
    ): Group
    createJobquery(
      content: String!
    ): Jobquery
    createConversation(
      receiverId: ID!
    ): Conversation
    sendMessage(
      conversationId: ID!
      body: String!
    ): Message
    addCategory(
      name: String!
      parent: String
    ): Category
  }

  type Subscription {
    messageAdded: Message!
  }
`

module.exports = typeDefs