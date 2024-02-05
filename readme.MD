
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

### Environment

```
npm install
npm run dev
npm run build
```

