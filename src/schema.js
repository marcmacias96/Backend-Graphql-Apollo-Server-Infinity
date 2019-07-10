export default `

  type Car {
    _id: String!
    name: String!
  }

  type User {
    _id : ID!
    name : String!
    email : String!
    password : String!
    images : [Image]
  }

  type Image {
    _id : ID!
    title : String!
    description : String
    fileName : String
    views : Int
    likes : Int
    timeStamp : Int
    uniqueId : String
    comments : [Comment]
  }

  type Comment {
    _id : ID!
    comment : String!
    timeStamp : Int
    postedBy : ID!
  }

  input UserInput {
    name : String!
    email : String!
    password : String!
  }

  input ImageInput {
    title : String!
    description : String
    file : Upload
  }

  input CommentInput {
    comment : String!
    postedBy : ID!
  }

  input SignInInput {
    email : String!
    password : String!
  } 

  type Query {
    allCars: [Car!]!

    getUsers : [User!]
    getUser( id : ID! ) : User
    getImages : [Image!]
    getImage( id : ID!) : Image
    getComments : [Comment!]
    getComment( id : ID!) : Comment
  }

  type Mutation {
    createCar(name: String!): Car!
    signIn(input : SignInInput!) : Token!
    signUp(input : UserInput!) : Token!
    createUser(input : UserInput!) : User!
    createImage(input : ImageInput!, usr_id : ID!) : User!
    createComment(input : CommentInput!, img_id : ID!) : Image!
  }

  type Subscription {
    photos : Image
  }

  type Token {
    token : String!
  }
`;