## Description
- Glam Closet is an outfit selector web app that allows users to combine different pieces of clothes, view and like outfits shared by others, and save outfits to their Glam Closet account.
- The clothes being displayed come from Amazon, Kohl's, Macy*s, Loft, Berrylook, and American Eagle. 

[Live DEMO](https://glamcloset.herokuapp.com/#/)

- In order to view all available features, you should signup. 
If you don't want to create an account, you can Login using:
- email: test@test.com
- password: 123456
 
## Technologies Used
- This app was built using the MERN stack: MongoDB, Express.js, React.js, and Node.js.
- All the data collected was scrapped from each clothing store using “Cheerio”.
- Used “Validator” for Client side validation.
- Made use of “Cloudinary” to store the uploaded pictures and “Heroku” for deployment.

## Clone or Download
$ git clone https://github.com/Glam-Coding-Girls/outfit-selector.git
$ npm i

## Usage (run fullstack app on your machine)
- MongoDB
- Node ^10.0.0
- npm
notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other.

## Server-side usage(PORT: 8080)
$ cd server   // make sure you're in the server folder
$ npm i       // npm install pacakges
$ npm run dev // run it locally

## Client-side usage(PORT: 3000)
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally





