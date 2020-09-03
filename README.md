# PAC MANY

- PAC MAN with many people -

2006 pepperlint-mocha

# Overview

Real time multiplayer Pac Man game in the browser for up to 4 people.

# MVP

A player should be able to play game:

1. as a single player
2. in a group of up to 4 at once.

Player should be able to:

1. Create a single game instance
2. Create a multi game instance
3. Join a multi game with a roomId

Game should have these qualities:

- Generate map and populate with interactive sprites
- 4 people playing at once with no lag or stutter
- Each player is a pac man that can eat pellets and power ups
- Players compete for highest score / pellet percentage
- Players immediately lose when HP goes below 0
- Game ends when board is empty or all players get killed
- Collisions between players
- Exits that enter at opposite sides of board
- Score count
- Ghosts that move sporadically and target all players
- When ghost hits player during normal state, player loses HP
- When ghost hits player in power-up state, ghost is eaten

edit: - players do not collide with one another

## POC

- Socket connection, 4 people can join/unjoin room
- Basic canvas rendered with static game map

# Stretch Goals

- p2p collision?
- more maps
- team games
- voice chat
- chatbox
- video integration
- mobile app

# Stack

- Phaser
- React
- Express
- Socket.io
- Database TBD

# Tier 1: Game Completion

## As a designer, I want to have:

- Working sound design
- All assets created and accessible via public folder
- Rendered game window in browser

## As an engineer, I want to be able to:

- Create a game lobby
- Have one 4 player room active
- Run tests to verify funtionality
- Tweak elements without major reworks
- Serve up data on safe and secure API

## As a player, I want to be able to:

- Visit site and successfully run game on local-host
- Select a character
- Move character Up, Down, Left, Right with fluid acceleration/glide/control
- Dimish health meter of other characters
- Lose life if my health bar gets too low
- Hear sounds corresponding to what's happening on screen

# Tier 2: Connectivity

## As a designer, I want to have:

- UI that allows users/players to create game instance
- UI that demonstrates controls and game rules clearly
- Random or custom tags for players
- Game score shown on window

## As an engineer, I want to be able to:

- Run secure connection with 4 player rooms
- Have one 4 player room via sockets
- Generate session w/sockets and access by room Id
- Collect player experience data to influence development

## As a player, I want to be able to:

- Invite friends to game
- Play with 3 other people in real time

## Tier 3: Polish / Stretch Goals

## As a designer, I want to have:

- Detailed character models
- More character sprites
- More stages
- A selection of music

## As an engineer, I want to be able to:

- Have fully working build on browser
- Mobile app buld

## As a player, I want to be able to:

- Create an account
- Have logged in experience
- See player profile with stats and records
- Sync my game account with social media
- Invite friends through FB/Twitter/Email

"scripts": {
"build": "webpack --config webpack.config.js ",
"start": "npm run start-server & npm run build-watch",
"start-dev": "npm run start-server & npm run build-watch",
"build-watch": "webpack -w --config webpack.config.js",
"start-server": "nodemon server/index.js"
},

"start": "webpack-dev-server --config webpack.config.js --open",

"devDependencies": {
"@babel/core": "^7.4.3",
"@babel/plugin-proposal-class-properties": "^7.4.0",
"@babel/plugin-transform-modules-commonjs": "^7.4.4",
"@babel/preset-env": "^7.4.3",
"@babel/preset-react": "^7.0.0",
"babel-jest": "^25.5.1",
"babel-loader": "^8.0.5",
"canvas": "^2.5.0",
"clean-webpack-plugin": "^3.0.0",
"file-loader": "^6.0.0",
"html-webpack-plugin": "^4.3.0",
"nodemon": "2.0.4",
"path": "^0.12.7",
"raw-loader": "^4.0.1",
"react": "^16.8.6",
"react-dom": "^16.8.6",
"terser-webpack-plugin": "^3.0.6",
"webpack": "^4.28.3",
"webpack-cli": "^3.2.1",
"webpack-dev-server": "^3.1.14",
"webpack-merge": "^4.2.1"
},
"dependencies": {
"@ion-phaser/react": "^1.2.2",
"@material-ui/core": "^4.11.0",
"@material-ui/icons": "^4.9.1",
"babel-core": "^6.26.3",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"classnames": "^2.2.6",
"css-loader": "^3.2.0",
"express": "4.17.1",
"fsevents": "^2.1.3",
"mongodb": "3.6.0",
"morgan": "1.10.0",
"phaser": "^3.17.0",
"phaser-matter-collision-plugin": "^0.10.2",
"react-redux": "^7.0.2",
"react-router-dom": "^5.2.0",
"redux": "^4.0.1",
"redux-thunk": "^2.3.0",
"socket.io": "2.3.0",
"socket.io-client": "2.3.0",
"style-loader": "^1.0.0"
}
