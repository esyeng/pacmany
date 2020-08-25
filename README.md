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
