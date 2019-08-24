<template>
  <div id="app">
    <v-app-bar color="indigo" dark fixed app>
      <v-toolbar-title>Vue Firebase Image Upload</v-toolbar-title>
    </v-app-bar>
    <v-app id="inspire">
      <v-content>
        <v-container fluid>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <img :src="imageUrl" height="150" v-if="imageUrl" />
              <v-text-field label="Select Image" @click="pickFile" v-model="imageName"></v-text-field>
              <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked"/>
              <v-btn color="primary" @click="upload">UPLOAD</v-btn>
            </v-flex>
          </v-layout>
          <br />

          <v-flex d-flex>
           <v-layout wrap>
             <v-flex md3 v-for="img in imgUrls" :key="img.id">
               <img :src="img.downloadUrl" height="150" />
               <v-btn @click="deleteImg(img.id)">x</v-btn>
             </v-flex>
           </v-layout>
          </v-flex>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from "./main"
import { mapState } from 'vuex'
export default {
  name: "App",
  mounted () {
    this.getImages()
  },
  data() {
    return {
      photo: null,
      photo_url: null,
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: ""
    }
  },
  methods: {
    getImages () {
      this.$store.dispatch('setImgs')
      this.imageName = ""
      this.imageFile = ""
      this.imageUrl = ""
    },
    pickFile () {
      this.$refs.image.click();
    },
    onFilePicked (e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
        });
      } else {
        this.imageName = ""
        this.imageFile = ""
        this.imageUrl = ""
      }
    },
    upload () {
      var storageRef = firebase.storage().ref()
      var mountainsRef = storageRef.child(`images/${this.imageName}`)
      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrl = downloadURL
          const bucketName = "xxx-xxxx-xxxxx.xxxxxxx.xxx"
          const filePath = this.imageName
          db.collection("images").add({
            downloadURL,
            downloadUrl:
              `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/images` +
              "%2F" +
              `${encodeURIComponent(filePath)}?alt=media`,
              originalName: this.imageName,
            timestamp: Date.now()
          })
          this.getImages()
        })
      })
    },
    async deleteImg (img) {
      let imgDBRef = await db.collection("images").doc(img).get()
      let imgFileName = imgDBRef.exists ? imgDBRef.data().originalName : null
      let storageRef = firebase.storage().ref()
      let desertRef = storageRef.child('images/' + imgFileName)
      await desertRef.delete()
      await db.collection("images").doc(img).delete()
      this.getImages()
    }
  },
  computed: mapState([
    'imgUrls'
  ])
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
