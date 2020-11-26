<template>
    <v-col md=6 class="ml-n3 mt-1">
        <v-card class="mx-auto" width="525" elevation="2">
              <v-card-title class="form-card-title">
                  <v-icon dark left small>mdi-map-marker-plus</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Add Account Location Details
                  </span>
              </v-card-title>

              <v-card-text class="mt-1">
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <span class="text-caption font-weight-bold ml-5 info--text">
                        Enter Country of operation
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-map-marker" 
                        placeholder="Country" 
                        dense 
                        class="mb-2" 
                        style="font-size: .9em;"
                        type="text"
                        :rules="countryRules"
                        v-model.trim="formData.country"
                    ></v-text-field>

                    <span class="text-caption font-weight-bold ml-5 info--text">
                        Enter city/town of operation
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-map-marker" 
                        placeholder="City" 
                        dense 
                        class="mb-2" 
                        style="font-size: .9em;"
                        type="text"
                        :rules="cityRules"
                        v-model.trim="formData.city"
                    ></v-text-field>
                  </v-form>
              </v-card-text>

              <v-card-actions class="mt-n3">
                  <v-spacer></v-spacer>

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="#6ecbea" 
                    small 
                    :loading="loading"
                    @click.stop="addLocation"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">save location</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

        <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" timeout="3000" :color="color" app class="mt-3" elevation="2">
            <span class="text-caption font-weight-bold black--text">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbbar -->

    </v-col>
</template>

<script>
// import map setters
import { mapGetters } from "vuex"
export default {
    name: 'Activation',
    // layout
    layout: 'main',
    //data
    data: () => ({
        formData: {
            city: '',
            country: ''
        },
        // password rules
        countryRules: [
            v => !!v || 'Country is required Key is required'
        ],
        // city rules
        cityRules: [
            v => !!v || 'City is required Key is required'
        ],
        // snackbar
        snackbar: false,
        // errorMessage
        mesage: '',
        //color
        color: 'success lighten-1',
        // loading
        loading: false,
        // loader
        loader: null,
        // valid
        valid: false,
        
    }),
    computed: {
        ...mapGetters('miscelleneous', [
            'activationMessage'
        ])
    },
    // methods for login in
    methods: {
        // login function
        async addLocation() {
            // validate the form
            if (!this.$refs.form.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/profile/location', {
                user_profile: {
                    location: this.formData
                }
            })
            .then(response => {
                // refetch the user
                this.$auth.fetchUser()
                    .then(() => {
                        // reset the form
                        this.$refs.form.reset()
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // redirect the user to the orders
                        this.$router.push({
                            path: '/account/phones'
                        })
                    })
            })
            // catch the error
            .catch(error => {
                // check the error
                if (error.response) {
                    // set the errormessg
                    this.errorMessage = error.response.data.errors.details
                } else {
                    // set the error message
                    this.message = 'There was a problem adding your location details. Please try again later.'
                }
                // set the color
                this.color = 'error lighten-1'
                // set the loading to false
                this.loading = false,
                // set the loader to null
                this.loader = null
                // set the snackbar to true
                this.snackbar = true
            })
        // check the status of the response            
        }
    }
}
</script>