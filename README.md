
## Docs

- Vue docs (frontend framework)
    https://vuetifyjs.com/en/features/application-layout/#dynamic-layouts-and-order

- Vuetify docs (material design framework)
    https://vuetifyjs.com/en/getting-started/quick-start

## Reading (optional)

- [HTML box model](https://www.w3schools.com/css/css_boxmodel.asp) - how elements are rendered

- [Guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

- [CSS basic](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)

## CI (Continuous Integration)

for each commit that has a tag (any name), the frontend will be published to (https://vyuka.bridzhavirov.cz/).

## Important scripts

### Terminal

`
cd directory
cd ..
`


### Git

```
git pull
git add *
git commit -m "description"
git push
```

#### How to add tag to a commit

```
git tag "vx.y.ZalphaN"
```

adds tag to the last commit

tag name can be arbitrary


```
git tag "ahojka-kluci"
```

To push the tag to the remote repository, you have to explicitly push it after you have pushed the commit it points to:

```
git push --tags
```

### Docker compose

Docker compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

Imagine you want to run `npm run dev` for frontend and backend at the same time. You can use docker-compose to run both services at the same time with one command.

You will need [Docker desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

```
docker-compose up
```

This command will start the services defined in `compose.yaml` file.

Alternatively, you can run the services in the background:

```
docker-compose up -d
```

To stop the services:

```
docker-compose down
```

Alternatively, you can use Podman instead of docker. 
