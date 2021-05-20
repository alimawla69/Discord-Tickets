
  

# Discord Tickets

  

Open tickets in website for discord server
  [ScreenShot](https://luffydev.xyz/)

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
PORT=8080
BOT_TOKEN=""
CLIENT_ID=""
CLIENT_SECRET=""
CALLBACK_URI="http://localhost:8080/api/callback"
DOMAIN="http://localhost:8080/"
DATABASE_URI=""
PREFIX=""
```
A. you can get BOT_TOKEN & CLIENT_SECRET & CLIENT_ID in https://discord.com/developers/applications



4. now you need to add your MongoDB url:
	 1. Go to [MongoDB Cloud](https://cloud.mongodb.com/) and create a account
	 2. Create Cluster and make your free database and get the link e.g `mongodb+srv://USER:PASS@CLUSTER_NAME.mongodb.net/DATABASE?retryWrites=true&w=majority`
	 3. go to [config/db.json](/config/db.json) file and paste the url there
  

5. now you are done just run the app using

  

```bash

$ npm run dev

```

  

and WebChat will be running at [localhost:3000](http://localhost:8080)

  

  

6. you can also host it to public by running

  

```bash

$ npm run start

```

  
## Problems, Bugs and Suggestions

in case you saw any Problems, Bugs and Suggestions you can tell me in the [issues](https://github.com/Luffy909/Discord-Tickets) OR [Discord Server](https://discord.gg/HFZRWUC)

and i will fix and your suggetions and tell you in news channel in [Discord Server](https://discord.gg/HFZRWUC)
