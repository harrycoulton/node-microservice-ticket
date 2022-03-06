# node-microservice-ticket

Common modules repo here: https://github.com/harrycoulton/node-microservice-ticket

- In order to run locally, please do the following after git clone:
    - From <code>[rootDir]</code> run: 
      - To set JWT_KEY: <code>kubectl create secret 
        generic jwt-secret --from-literal=JWT_KEY=randomkey</code>
      - To set ensure ingress controller works: <code>kubectl apply -f 
        https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml </code>
      - You may also need to build and push the docker images - mine are pushed and are public however if in case of error
    run the following in each subdir from root apart from <code>common</code> and<code>infra</code>
        - Command:
            - <code>docker build -t [yourDockerId]/[dirName] . </code>
            - <code>docker push [yourDockerId]/[dirName] </code>
        - Example for a user with <code> dockerId = joebloggs </code>:
            - <code>docker build -t joebloggs/auth . </code>
    - Ensure you add <code>ticketing.test</code> to your <code>etc/hosts</code> file under <code>127.0.0.1</code>
        - You may run into issues using chrome where chrome enforces a HSTS policy forcing you to access
    localhost on https. If you run into this, or see an apache screen rather than the react app, please follow this guide:  https://stackoverflow.com/a/28586593
          
    - Run <code>skaffold dev</code> from the root directory
          

- You can access the app at <code>ticketing.test</code>


- I've exported a postman collection which you can find under <code>./nodejs-microservices-ticketing.postman_collection</code>. 
Simply import this to postman and you can test the endpoints with postman.
  

- You can run tests from each directory by running <code>npm run test</code>


- When the application is in a more complete state I will document each of the endpoints,
  however at present each service will have their respective endpoints documented in code
  in <code>routes/routeAddresses</code>


- At present the React app is a skeleton, this will be changed to a complete TS 
  client once the backend is complete.