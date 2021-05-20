
  

# [Discord Tickets](https://discord.gg/HFZRWUC)

  

Open tickets in website for discord server
  [ScreenShot](https://prnt.sc/136jtxx)

## Installation

1. Run this command in the command line

  

```bash

$ git clone https://github.com/Luffy909/Discord-Tickets.git

```

2. Now you'r done

  

## How to run ?

  

1. go to command line/terminal and run

  

  

```bash

$ cd Discord-Tickets

```

  

  

2. then you have to install required packges by using this command bellow
  

```bash

$ npm i

```

  
3. now you need to add file named .env and type the required items bellow
```buh
PORT=8080// You'r port
BOT_TOKEN="" //You'r bot TOKEN
CLIENT_ID="" //You'r bot ID
CLIENT_SECRET=""//You'r bot Client secret
CALLBACK_URI="http://localhost:8080/api/callback" //You'r callbackURL
DATABASE_URI="" //You'r mongodbURL
PREFIX=""//You'r bot prefix
GUILDID=""//You'r serverid
```
example
```
PORT=8080
BOT_TOKEN="ODQ0OTE0MDQ4MjA5NTE4NjEy.YKZVhg.vWvp6CMAYrwmx4Sfc1P44RstNUTHwgSA"
CLIENT_ID="487312058174662500"
CLIENT_SECRET="kMZmV_kLMqs6yjxvmk8goefTsCr7DEF6"
CALLBACK_URI="http://localhost:8080/api/callback"
DOMAIN="http://localhost:8080/"
DATABASE_URI="mongodb+srv://USER:PASS@CLUSTER_NAME.mongodb.net/DATABASE?retryWrites=true&w=majority"
PREFIX="!"
GUILDID="688077913463324683"
```
A. you can get BOT_TOKEN & CLIENT_SECRET & CLIENT_ID in https://discord.com/developers/applications


4. now you need to add callback to you'r discord bot
- go to https://discord.com/developers/applications/
- select your bot
- go to OAuth2 ex: https://discord.com/developers/applications/487312058174662500/oauth2
- then go to add redirects then type http://localhost:8080/api/callback

5. now you need to add your MongoDB url:
	 1. Go to [MongoDB Cloud](https://cloud.mongodb.com/) and create a account
	 2. Create Cluster and make your free database and get the link e.g `mongodb+srv://USER:PASS@CLUSTER_NAME.mongodb.net/DATABASE?retryWrites=true&w=majority`
	 3. go to .env file and paste the url in DATABASE_URI
  

6. now you are done just run the app using

  

```bash

$ npm run dev

```

  

and WebChat will be running at [localhost:8080](http://localhost:8080)

  

  

7. you can also host it to public by running

  

```bash

$ npm run start

```

  
## Problems, Bugs and Suggestions

in case you saw any Problems, Bugs and Suggestions you can tell me in the [issues](https://github.com/Luffy909/Discord-Tickets) OR [Discord Server](https://discord.gg/HFZRWUC)

and i will fix and your suggetions and tell you in news channel in [Discord Server](https://discord.gg/HFZRWUC)

## Luffy99 (https://discord.gg/HFZRWUC) All rights reserved.
