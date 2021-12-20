# rate-a-tune
A service where users can submit/view ratings and reviews about Spotify songs they listen to.

How to use
----------
- Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed.
- Make sure Docker Desktop is loaded.
- In a terminal, at the root directory of this project, type:
  - ``` docker compose build ``` to build the docker images.
  - ``` docker compose up ``` to generate and run the docker containers.
- Open up [localhost:4200](http://localhost:4200) in a browser to view the client site.

docker compose
--------------
If a different port is needed to expose the docker containers:
- Navigate to the ``` docker-compose.yml ``` file in the root directory.
- Change the two ``` <port>:<port> ``` values as necessary for each service.
- **Go through each file and ensure the uri address the client/server connects to is correct**
