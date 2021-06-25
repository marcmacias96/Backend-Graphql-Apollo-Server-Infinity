# Backend-Graphql-Apollo-Server-Infinity

## Vision

API Nodejs-Graphql que administra servicios de una Red social, clone de instagram 

## Tecnologías
![Mongo-Graphql-Express.jpg](https://github.com/marcmacias96/Backend-Graphql-Apollo-Server-Infinity/blob/master/Mongo-Graphql-Express.jpg)

## Diagrama de arquitectura física
https://github.com/marcmacias96/Backend-Graphql-Apollo-Server-Infinity/blob/master/InfinityAPP%20-%20DIAGRAMA%20FISICO.png


`Schema`


```javascript
   type Query {
    allCars: [Car!]!
    getUsers : [User!]
    getUser( id : ID! ) : User
    getImages : [Image!]
    getImage( id : ID!) : Image
    getComments : [Comment!]
    getComment( id : ID!) : Comment
    stats (usr_id : ID!) : Stat!
    getMe  : User!
  }
  
  type Mutation {
    createCar(name: String!): Car!
    signIn(input : SignInInput!) : Token!
    signUp(input : UserInput!) : Token!
    createUser(input : UserInput!) : User!
    createImage(input : ImageInput!, usr_id : ID!) : User!
    createComment(input : CommentInput!, img_id : ID!) : Image!
    like(img_id : ID!) : Image!
  }
  
  type Subscription {
    photos : Image
    comments : Comment
  }
```


## Dependencias

- apollo-server-express 
- bcryptjs
- express
- graphql 
- graphql-tools
- jsonwebtoken 
- mongoose
- morgan
- nodemon


