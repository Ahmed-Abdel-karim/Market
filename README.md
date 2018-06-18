# Market
Mraket is a free fictitious platform for buying and selling services and goods such as electronics, furniture, household goods, cars and bikes. you can post, edit, delete and search for any product you want also you can make a comment or send a message to the advertiser.

[visit the website here](https://pacific-lake-47000.herokuapp.com)
## Purpose:
the purpose of this web application is to showcase my coding skills , i did not put so much efforts
into design and front-end fancy stuff like animations , i just fouced in connecting react with redux 
and the back end API.

## Tech-stack
### server-side
* Node.js          (server-side Javascript environment) 
* express.js       (Node.js frameWork)
* mongodb          (database)
* mongoose         (mongodb object modeling for node.js)
* gridfs           (storing files in mongodb)
* socket.io        (Realtime application framework)
* sendGrid         (Email Delivery Service)

## client-side:
* materialize      (front-end framework)
* React.js         (Javascript UI Library)
* Redux.js         (state container for JavaScript apps)
* React-Router     (Routing for React.js)
* Redux-form       (from state manager in redux)
* react-socket-io  (A react provider for socket.io)
* react-google-maps(React.js Google Maps integration component)


## Guest will be able to :
* search for ads
* see any ad
* see the advertiser profile

 ## User will be able to :
* add ad
* update his ad 
* delete his ad
* search for ads
* see any ad
* add ad to favorite 
* remove ad from favorite
* add comment to the ad
* see the advertiser profile
* send the advertiser messages and make a conversation with him
* edit his personal information and contacts and upload avatar photo

## website features
### Authentication
#### strategy : JWT(JSON Web Token)-strategy.
#### procuders
1. the user fill a form with his email and password and submit it to the back-end route
2. the server check for  the user existance and the and if not it hashes the password and create a new document in the database with the user-name and the hashed password
3. then it sends a verification email to the user email
4. a message appears on the screen show that the user must verify his account before using it
5. the user check the email and press the link in the message to verify his account
6. a message appears on the screen show that the account has been verified and the user can login
7. the user login with his Credentials and submit a from to the server
8. if every thing is ok the server respond with a token , the client store this token in the local storage
9. the user stay logged in until he logout or the token is expired then he has to login again
10. if the user did not receive the varification message he can enter the email he used to makethis account and submit the form to resend the verification message
11. if the user forget his password he submit his email to the server and the server send a message with a token to his email
12. when the user receive the email and press on the link the browser redirect to the website with form to reset his password
13. when the user logout the token is removed from local Storage and the user is redirected to the home page
### routes protection
#### server-side 
I used passport middleware to secure the protected routes
#### client-side
i made a higher order components to check if the user is exist it render the wrapped component and if not it redirect to the home page 
### search
* user can search for ads using text input 
* filter the results by price(from-to),category,country and region
* sort results by relevance,date and price
* order ascending or descending
### create ad 
#### user can create ad with the following parameters using redux-form :
* title
* price
* description
* category
* brand
* tags
* country 
* region
* adress used with google maps to show the place in the ad page
* contacts : email and phone number
* iamge gallery consist of from 0 to 3 photos 
### edit ad 
 user can edit his own ad from the dashboard , i used redux-from with the initial values of the original ad so the user only edit the part he needed 
### delete ad 
 user can delete his own ad from the ads section in the dashboard
### add ad to favorite or remove it 
user can add any ad to his favorite ads , this selection is populated  the application for example (search results , landing page , the ad page) so that he add or remove from any part of the application
### see ad & comment 
user can see any ad and comment on it , i used socket.io in this part to provide a real time interaction with the user
### send a message to the advertiser 
by clicking on the send message button in the advertiser profile page the user can start conversation with the advertiser the advertiser can reply immediately , this conversation uses socket.io 
### notification system 
when the user is offline and receive a message , when he goes online a notification message appears on the screen tell the user to go to the messages section in the dashboard to check the new messages , also when the user make a conversation , when he receive a message from other user it appears on the top or side of the screen
