<template>
    <!-- Row for the practioner -->
    <v-row align="center" class="mb-n1">
      <v-col md="12" class="mb-n3">
        <v-card class="mx-auto" width="530" elevation="2">
         <!-- Card title -->
          <v-card-title>
            <v-row class="mt-n2 ml-n4">
              <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <!-- Button that displays the avatar of the user -->
                  <v-btn dark v-bind="attrs" v-on="on" text>
                    <v-avatar class="mr-3" size="33">
                        <img :src="user.profile_pic ? user.profile_pic : '/images/unknown1.png'">
                    </v-avatar>
                    <span class="teal--text mr-3 text-capitalize font-weight-bold text-caption ml-2 mb-n2">
                        {{ user.full_name }}
                    </span>
                  </v-btn>

                    <!-- Button for changing the profile picture -->
                    <v-btn x-small text icon color="info" @click="profileDialog = true">    
                        <v-icon x-small left class="mb-n6">mdi-camera-plus</v-icon>
                    </v-btn>
                    <!-- End of button for changing the profile picture change -->
                  <!-- End of the button -->
                </template>

                <v-list dense shaped v-if="user.profile_pic">
                  <v-list-item color="purple darken-3" class="text--red mb-n2">
                    <v-list-item-title>
                        <!-- Full image of the user -->
                        <v-avatar class="profile mb-2 ml-2" color="grey" size="124">
                            <v-img :src="user.profile_pic"></v-img>
                        </v-avatar>
                        <!-- End of the full image -->
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>           
              <v-spacer></v-spacer>

              <v-icon color="cyan lighten-1" small class="mr-5">mdi-shield-check</v-icon>
          
            </v-row>
          </v-card-title>
          <v-divider class="mt-n3 mb-1"></v-divider>
          <!-- End of card title -->
        
            <!-- Card text for displaying the about of the worker -->
            <v-card-text>
            <!-- Row for about -->
            <v-row class="mt-n2" >
                <v-list dense shaped class="mt-n3 ml-3">
                    <!-- Full name of the profile owner -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon small color="grey" left>mdi-account-tie</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Account name:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ user.full_name }}
                        </span>
                        <v-btn text x-small class="ml-2">
                            <v-icon x-small color="info" left>mdi-account-edit</v-icon>
                            <span class="text-caption info--text font-weight-bold text-capitalize">edit</span>
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of full name -->

                     <!-- Account Type -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                          <v-icon small color="grey" left>mdi-account-hard-hat</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Account Type:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ user.user_type }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of full name -->

                     <!-- Full name of the profile owner -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon small color="grey" left>mdi-access-point</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Account Status:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ user.is_active || !user.is_supended ? 'Active' : 'Suspended' }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of full name -->

                     <!-- Location of the user -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                          <v-icon small color="grey" left>mdi-crosshairs</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Location:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ user.location }}
                        </span>
                        <v-btn text x-small class="ml-2" @click="showEditLocation">
                            <v-icon x-small color="info" left>mdi-account-edit</v-icon>
                            <span class="text-caption info--text font-weight-bold text-capitalize">edit</span>
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of full name -->

                     <!-- Email contact of the current user -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon small color="grey" left>mdi-at</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Emails:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ user.auth_email }}
                        </span>
                        <v-btn text x-small class="ml-2" @click="showEditEmail">
                            <v-icon x-small color="info" left>mdi-account-edit</v-icon>
                            <span class="text-caption info--text font-weight-bold text-capitalize">edit</span>
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of email contact -->

                     <!-- phone contacts of the current user -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon small color="grey" left>mdi-phone-classic</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Phones:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ user.phone }}
                        </span>
                        <v-btn text x-small class="ml-2" @click="showEditPhone">
                            <v-icon x-small color="info" left>mdi-account-edit</v-icon>
                            <span class="text-caption info--text font-weight-bold text-capitalize">edit</span>
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of phones -->
                </v-list>
            </v-row>
            <!-- End of row for about -->
            </v-card-text>
            <!-- End of card text for displaying the about of the worker -->

            <v-card-actions class="mt-n2">
              <span class="text-caption text-capitalize font-weight-bold error--text ml-8">
                Current Offer tokens: <span class="ml-1">
                  {{ $auth.user.tokens }}
                </span>
              </span>
              <v-spacer></v-spacer>
                <v-btn 
                  small 
                  dark
                  color="teal lighten-1" 
                  depressed 
                  class="mr-6"
                  @click="() => $store.commit('dialogs/SHOW_UPGRADE')"
                >
                    <span class="text-capitalize font-weight-bold text-caption">one time upgrade</span>
                </v-btn>
            </v-card-actions>


        </v-card>
      </v-col>

        <!-- Dialog for updating the location -->
        <v-dialog v-model="locationDialog" max-width="520" persistent>
            <v-card>
                <v-card-title class="teal">
                  <v-icon dark left small>mdi-map-marker-plus</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Update Account Location Details
                  </span>
                </v-card-title>

                <v-card-text class="mt-1">
                  <v-form ref="locationForm" v-model="valid" lazy-validation>
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
                            v-model.trim="locationData.country"
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
                            v-model.trim="locationData.city"
                        ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions class="mt-n3">
                  <v-spacer></v-spacer>

                  <!-- Cance button -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-2 mb-n2" 
                    color="error" 
                    small 
                    text
                    @click.stop="locationDialog = false"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">cancel</span>
                  </v-btn>
                  <!-- End of cancel button -->

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="teal" 
                    small 
                    :loading="loading"
                    @click.stop="updateLocation"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">update location</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for the updating of the location -->

        <!-- Dialog for updating the location -->
        <v-dialog v-model="emailsDialog" max-width="520" persistent>
            <v-card>
                <v-card-title class="teal">
                  <v-icon dark left small>mdi-at</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Update Email Information
                  </span>
                </v-card-title>

                <v-card-text class="mt-3">
                  <v-form ref="emailsForm" v-model="valid" lazy-validation>
                        <span class="text-caption font-weight-bold ml-5 info--text">
                            Enter email addresses seperated by a comma
                        </span>
                        <!--Order type -->
                        <v-text-field 
                            prepend-icon="mdi-at" 
                            placeholder="email1@example.com" 
                            dense 
                            class="mb-2 mt-2" 
                            style="font-size: .9em;"
                            type="email"
                            :rules="emailRules"
                            v-model.trim="emailData.email"
                        ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions class="mt-n3">
                  <v-spacer></v-spacer>
                 <!-- Cance button -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-2 mb-n2" 
                    color="error" 
                    small 
                    text
                    @click.stop="emailsDialog = false"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">cancel</span>
                  </v-btn>
                  <!-- End of cancel button -->

                  <!-- update button -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading"
                    @click.stop="updateEmails"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">update emails</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
                  <!-- End of update button -->
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for the updating of the location -->

        <!-- Dialog for updating the location -->
        <v-dialog v-model="phoneDialog" max-width="520" persistent>
            <v-card>
                <v-card-title class="teal">
                  <v-icon dark left small>mdi-phone-classic</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Update Account Phone Number
                  </span>
                </v-card-title>

                <v-card-text class="mt-3">
                  <v-form ref="phoneForm" v-model="valid" lazy-validation>
                        <span class="text-caption font-weight-bold ml-5 info--text">
                            Enter new phone number
                        </span>
                        <!--Order type -->
                        <v-text-field 
                            prepend-icon="mdi-phone-classic" 
                            placeholder="0712345678" 
                            dense 
                            class="mb-2 mt-2" 
                            style="font-size: .9em;"
                            type="email"
                            :rules="phoneRules"
                            v-model.trim="phoneData.phone"
                        ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions class="mt-n3">
                  <v-spacer></v-spacer>
                 <!-- Cance button -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-2 mb-n2" 
                    color="error" 
                    text
                    small 
                    @click.stop="phoneDialog = false"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">cancel</span>
                  </v-btn>
                  <!-- End of cancel button -->

                  <!-- update button -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="teal" 
                    small 
                    :loading="loading"
                    @click.stop="updatePhone"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">update phone</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
                  <!-- End of update button -->
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for the updating of the location -->

        <!-- Dialog for updating the location -->
        <v-dialog v-model="aboutDialog" max-width="520" persistent>
            <v-card>
                <v-card-title class="teal">
                  <v-icon dark left small>mdi-account-details</v-icon>
                  <span class="text-caption font-weight-bold white--text ml-3">
                    Update Account Detailed Description
                  </span>
                </v-card-title>

                <v-card-text class="mt-3">
                  <v-form ref="descriptionForm" v-model="valid" lazy-validation>
                    <span class="text-caption font-weight-bold info--text"> 
                        Current word count:  {{ wordCount() }} / 300
                    </span>
                    <!-- Options for the category -->
                    <v-textarea  
                      :hint="hint"
                      auto-grow 
                      placeholder="Professional Details" 
                      dense 
                      class="mt-3"  
                      style="font-size: .9em;"
                      v-model="descriptionData.description"
                      :rules="descriptionRules"
                    ></v-textarea>
                  </v-form>
              </v-card-text>

              <v-card-actions class="mt-n5">
                  <v-spacer></v-spacer>
                  <!-- Cance button -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-2 mb-n2" 
                    color="error"
                    text 
                    small 
                    @click.stop="aboutDialog = false"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">cancel</span>
                  </v-btn>
                  <!-- End of cancel button -->

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading"
                    @click.stop="updateDescription"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">update about</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
                  <!-- End of update button -->
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for the updating of the location -->

        <!-- Dialog for updating the location -->
        <v-dialog v-model="profileDialog" max-width="520" persistent>
            <v-card>
                <v-card-title class="teal">
                  <v-icon dark left small>mdi-camera-plus</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Update Account Profile Picture
                  </span>
                </v-card-title>

                <v-card-text class="mt-3">
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

                <v-card-actions class="mt-n3">
                  <v-spacer></v-spacer>
                 <!-- Cance button -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-5 mb-n2" 
                    color="error"
                    text 
                    small 
                    @click.stop="hideProfileDialog"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">cancel</span>
                  </v-btn>
                  <!-- End of cancel button -->

                  <!-- update button -->
                  <v-btn 
                    v-if="loading"
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-7 mb-n2" 
                    color="teal" 
                    text
                    small 
                    :loading="loading"
                  >

                      <template v-slot:loader>
                        <span class="text-caption font-weight-bold text-capitalize ml-2">uploading...</span>
                          <span class="custom-loader">
                              <v-icon small light color="teal">mdi-cached</v-icon>
                          </span>
                      </template>
                  </v-btn>
                  <!-- End of update button -->
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for the updating of the location -->


      <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2">
            <span class="text-caption font-weight-bold">
              {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-row>
    <!-- End of the practitioner card -->
</template>

<script>
// import map getters
import { mapGetters } from "vuex"
// import dropzone for the attachment uploads
import Dropzone from 'nuxt-dropzone'
// import the dropzone css
import 'nuxt-dropzone/dropzone.css'
// compoent definiton
export default {
    // name of the component
    name: "WorkerProfileCard",
    // components
    components: {
      Dropzone
    },
    // props
    props: {
        user: {
            type: Object
        }
    },
    // computed
    computed: {
        // get dropzone options
        ...mapGetters('created_order', [
            'profileOptions'
        ])
    },
    // data
    data: () => ({
      // loading
      loading: false,
      // loader:
      loader: null,
      // color
      color: 'success lighten-1',
      // message:
      message: '',
      // valid
      valid: false,
      // snackbar
      snackbar: false,
      // location dialog
      locationDialog: false,
      // location form
      locationData: {
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
        // emailsDialog
        emailsDialog: false,
        // emails fomr
        emailData: {
            email: ''
        },
        // emails rules
        emailRules: [
            v => !!v || 'Email Address is required.',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        // phone dialog
        phoneDialog: false,
        // emails rules
        phoneRules: [
            v => !!v || 'Phone number is required.',
            v => (v && v.length == 10) || 'Phone number must be 10 digits.'
        ],
        // phone data
        phoneData: {
            phone: ''
        },
        // profile dialog
        profileDialog: false,
        // pprfile data
        profileData: {
            pic: null
        },
        // hint
        hint: `
            Your Description should include: 
                1. A full introduction of who you are, including your name\n
                2. A detailed description of your profession, skills, experience and any other professional information necessary\n
                3. An explanation of why you are the best in your field and why the client should hire you for their job\n
                4. Any other information you may find necessay for the client to know about you to aid in their hiring you.
        `,
        // description data
        descriptionData: {
          description: ""
        },
        // description dialog
        aboutDialog: false,
        // description rules
        descriptionRules: [
            v => !!v || 'Description is required.',
            v => (v && v.split(/\s+/).length - 1 == 300) || 'Description has to have a minimum of 300 words.'
        ],
    }),
    // methods
    methods: {
        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 50).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(50).join(" ")
        },

        // show more
        showMore() {
          this.$store.commit('user_profile/SHOW_USER_MORE')
        },

        // function for showing the edit location
        showEditLocation () {
            // set the location country
            this.locationData.country = this.user.country
            // set the location city
            this.locationData.city = this.user.city
            // show the loction dialog
            this.locationDialog = true
        },

        // function for showing the edit location
        showEditEmail () {
            // set the location country
            this.emailData.email = this.user.auth_email
            // show the loction dialog
            this.emailsDialog = true
        },

        // function for showing the edit location
        showEditPhone () {
            // set the location country
            this.phoneData.phone = this.user.phone
            // show the loction dialog
            this.phoneDialog = true
        },

        // hide the profile dialog
        hideProfileDialog () {
            // reset the fomr
            this.$refs.dropzone.removeAllFiles()
            // set the loading to false
            this.loading = false
            // set the loader to null
            this.loader = null
            // set the show dialog to false
            this.profileDialog = false

        },

        // function for showing the desription dialog
        showDescriptionDialog () {
            // set the location country
            this.descriptionData.description = this.user.work_profile.about
            // show the loction dialog
            this.aboutDialog = true
        },

        // function for returning the current word count
        wordCount() {
            if (this.descriptionData.description) {
                // return the word count
                return this.descriptionData.description.split(/\s+/).length - 1
            } else{
                // return 0
                return 0
            }
        },

        // function for upload success
        uploadSuccess(file, response) {
            // refetch the user
            this.$auth.fetchUser()
                .then(() => {
                    console.log(this.$auth.user.profile_pic)
                    // set the profile picture
                    this.$store.commit('user_profile/UPDATE_PICTURE', {profile: this.$auth.user.profile_pic})
                    // rerset the dropzone
                    this.$refs.dropzone.removeAllFiles()
                    // set the message
                    this.message = 'Success. Profile Picture successfully updated.'
                    // set the loading to false
                    this.loading = false
                    // set the loader to null
                    this.loader = null
                    // hide the dialog
                    this.profileDialog = false
                    // show the snackbar
                    this.snackbar = true
                })
        },

        // function for uploading files
        uploadingFiles() {
            // set the loading to true
            this.loading = true
            // set the loader to loading
            this.loader = this.loading
        },

        // update location
        async updateLocation() {
            // validate the form
            if (!this.$refs.locationForm.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/profile/location', {
                user_profile: {
                    location: this.locationData
                }
            })
            .then(response => {
                // refetch the user
                this.$auth.fetchUser()
                    .then(() => {
                        // update the location
                        this.$store.commit('user_profile/UPDATE_LOCATION', {country: this.locationData.country, city: this.locationData.city})
                        // reset the form
                        this.$refs.locationForm.reset()
                        // set the message
                        this.message = 'Success. Your have successfully updated your location details.'
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // hide the location dialog
                        this.locationDialog = false
                        // show the snackbar
                        this.snackbar = true
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
        },

        // function for updating the email
        async updateEmails() {
            // validate the form
            if (!this.$refs.emailsForm.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/change/email', {
                auth_email: this.emailData.email
            })
            .then(({ data }) => {
                // get the current user
                this.$auth.fetchUser()
                    .then(() => {
                        //console.log(data)
                        // reset the emails
                        this.$store.commit('user_profile/UPDATE_EMAIL', {email: this.emailData.email})
                        // reset the form
                        this.$refs.emailsForm.reset()
                        // set the message
                        this.message = data.data.details
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // hide the email dialog
                        this.emailsDialog = false
                        // show the snackbar
                        this.snackbar = true
                    })
                
            })
            // catch the error
            .catch(error => {
                // check the error
                if (error.response) {
                    // set the errormessg
                    this.message = error.response.data.errors.details
                } else {
                    // set the error message
                    this.message = 'There was a problem updating your email address. Please try again later.'
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
        },

        // function for updating the email
        async updatePhone() {
            // validate the form
            if (!this.$refs.phoneForm.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/update/phone', {
                phone: this.phoneData.phone
            })
            .then(({ data }) => {
                // get the current user
                this.$auth.fetchUser()
                    .then(() => {
                        // reset the emails
                        this.$store.commit('user_profile/UPDATE_PHONE', {phone: this.$auth.user.phone})
                        // reset the form
                        this.$refs.phoneForm.reset()
                        // set the message
                        this.message = data.data.details
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // hide the phone dialog
                        this.phoneDialog = false
                        // show the snackbar
                        this.snackbar = true
                    })
                
            })
            // catch the error
            .catch(error => {
                // check the error
                if (error.response) {
                    // set the errormessg
                    this.message = error.response.data.errors.details
                } else {
                    // set the error message
                    this.message = 'There was a problem updating your phone number. Please try again later.'
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
        },

        // function for updating the description
        // login function
        async updateDescription() {
            // validate the form
            if (!this.$refs.descriptionForm.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/profile/intro', {
                user_profile: {
                    professional_intro: this.descriptionData.description
                }
            })
            .then(({ data }) => {
                 // refetch the current user
                this.$auth.fetchUser()
                    // only respond to the user once the user has being refetched
                    .then(() => {
                      // update the description
                      this.$store.commit('user_profile/UPDATE_DESCRIPTION', {description: this.descriptionData.description})
                        // reset the route
                        this.$refs.descriptionForm.reset()
                        // set the message
                        this.message = data.data.details
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // hide the snackbar
                        this.aboutDialog = false
                        // show the snackbar
                        this.snackbar = true
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
                    this.message = 'There was a problem saving your description. Please try again later.'
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
        }

    }
}
</script>
