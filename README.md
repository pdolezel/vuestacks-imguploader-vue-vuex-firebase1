# vuestacks-img-fb-vuex

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### TECHNICAL OVERVIEW

The VueStacks image uploader demo enables uploading of images from local files to Firebase Storage. 

```Upload ()``` is an async function that pushes the selected image into Firebase storage. The image url is also pushed into the database to enable the image to continually display in the DOM after refreshing.

```deleteImg ()``` is an async function that enables removal of the image from storage, as well as the image ref (downloadUrl) from database.

```onFilePicked ()``` handles loading of images from local files.

```getImages ()``` is a callback function that dispatches an action in store.js (the Vuex store). The action retrieves the image from the database then commits a mutation. The state will be updated with the retrieved data after the mutation has been committed. A computed property (using the mapState helper) in App.vue returns the state to the component.

### Setting up FIREBASE for this project

1) Set up new project in Firebase with Database and Storage enabled
2) Implement the following Firebase SDK scripts in main.js:
```
firebase.initializeApp({
  databaseURL: "",
  projectId: "",
  storageBucket: ""
});

export const db = firebase.firestore();
```
3) Add storageBucket name to ```const bucketName = ''``` in App.vue

Enjoy the demo! Submit an issue if you see anything that could be improved!
