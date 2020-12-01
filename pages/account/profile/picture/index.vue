<template>
    <v-col  md=6 class="ml-n3 mt-1">
        <v-card class="mx-auto" width="525" elevation="2">
              <v-card-title class="teal">
                  <v-icon dark left small>mdi-account-lock</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Add Account Profile Picture
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                <!--Order type -->
                <dropzone 
                    id="foo" 
                    ref="dropzone" 
                    :options="profileOptions" 
                    :destroyDropzone="true" 
                    style="margin-top: 2em;"
                    @vdropzone-complete="uploadSuccess"
                    @vdropzone-sending="uploadingFiles"
                ></dropzone>
              </v-card-text>

              <v-card-actions class="mt-n2">
                  <v-spacer></v-spacer>
                  <!-- Cnacel Dialog -->

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-8" 
                    color="teal" 
                    small 
                    text
                    :loading="loading"
                    v-if="loading"
                  >
                      <template v-slot:loader>
                            <span class="text-caption font-weight-bold mr-2 text-capitalize">uploading...</span>
                            <span class="custom-loader">
                                <v-icon small light color="teal">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

         <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" timeout="-1" :color="color" app  elevation="2">
            <span class="text-caption font-weight-bold black--text">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbbar -->

    </v-col>
</template>

<script>
// import dropzone for the attachment uploads
import Dropzone from 'nuxt-dropzone'
// import the dropzone css
import 'nuxt-dropzone/dropzone.css'
// import map getters
import { mapGetters } from "vuex"
// component definition
export default {
    name: 'Activation',
    // layout
    layout: 'main',
    // components
    components: {
      Dropzone
    },
    // computed
    computed: {
        // get dropzone options
        ...mapGetters('created_order', [
            'profileOptions'
        ])
    },
    //data
    data: () => ({
        // snackbar
        snackbar: false,
        // errorMessage
        message: '',
        // color
        color: 'success lighten-1',
        // loading
        loading: false,
        // loader
        loader: null,
        // valid
        valid: false,
        
    }),
    // methods for login in
    methods: {
        // function for upload success
        uploadSuccess(file, response) {
            // refetch the user
            this.$auth.fetchUser()
                .then(() => {
                    // set the loading to false
                    this.loading = false
                    // set the loader to null
                    this.loader = null
                    // rediect the user to the their profile page
                    this.$router.push({
                        path: `/account/${this.$auth.user.id}/profile`
                    })
                })
        },

        // function for uploading files
        uploadingFiles() {
            // set the loading to true
            this.loading = true
            // set the loader to loading
            this.loader = this.loading
        },
    },

    // mounted
    mounted() {
        // get the token
        let token = window.localStorage.getItem('auth._token.local')
        // commit to get the 
        this.$store.commit('dropzone/SET_TOKEN', token)
    }
}
</script>