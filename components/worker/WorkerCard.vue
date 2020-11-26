<template>
    <!-- Row for the practioner -->
    <v-row align="center" class="mb-n1">
      <v-col md="12" class="mb-n3">
        <v-card class="mx-auto" width="525" elevation="2">
         <!-- Card title -->
          <v-card-title>
            <v-row class="mt-n2 ml-n4">
              <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <!-- Button that displays the avatar of the user -->
                  <v-btn dark v-bind="attrs" v-on="on" text>
                    <v-avatar class="mr-3" size="32">
                        <img :src="worker.profile_pic ? worker.profile_pic : '/images/unknown1.png'">
                    </v-avatar>
                    <span class="teal--text text-capitalize font-weight-bold text-caption mb-n2">
                        {{ worker.full_name }}
                    </span>
                  </v-btn>
                  <!-- End of the button -->
                </template>

                <v-list dense shaped v-if="worker.profile_pic">
                  <v-list-item color="purple darken-3" class="text--red mb-n2">
                    <v-list-item-title>
                        <!-- Full image of the user -->
                        <v-avatar class="profile mb-2" color="grey" size="124">
                            <v-img :src="worker.profile_pic"></v-img>
                        </v-avatar>
                        <!-- End of the full image -->
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
                              
              <v-spacer></v-spacer>
            
              <!-- Rating if the current user -->
              <div class="mr-4 mt-n2">
                <v-row class="mt-n1 mb-n2">
                    <v-col class="mr-5">
                        <span class="text-caption font-weight-bold teal--text">Rating :</span>
                    </v-col>

                    <v-col class="">
                        <v-rating
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            half-increments
                            dense
                            small
                            :value="worker.rating"
                            class="ml-n10"
                            readonly
                        ></v-rating>
                    </v-col>
                </v-row>
              </div>
          
            </v-row>
          </v-card-title>
          <v-divider class="mt-n3 mb-1"></v-divider>
          <!-- End of card title -->
        
          <!-- Card text for displaying the about of the worker -->
          <v-card-text>
            <!-- Row for the skills -->
            <v-row class="mt-n3 ml-1"> 
              <v-chip small outlined color="cyan" class="ml-2 mt-1" v-for="(skill, index) in worker.skills" :key="index">
                <span class="warning--text">
                    {{ skill }}
                </span>
              </v-chip>
            </v-row>
            <!-- End of row for skills -->

            <!-- Row for about -->
            <v-row class="mt-n2" >
                <p class="text-caption pa-4 font-weight-normal">
                    {{ show_first_fifty(worker.about )}}
                    <span id="dots-1" :style="worker.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="worker.show_more ? 'display: inline;' : 'display: none;'">
                        {{ show_hidden_description(worker.about )}}
                    </span>
                    <!-- Button for showing more description -->
                    <v-btn icon @click="showMore(worker.id)" x-small>
                    <v-icon color="info" x-small> 
                        {{worker.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                    </v-icon>
                    </v-btn>
                    <!-- End of button for wshoing the description -->
                </p>
            </v-row>
            <!-- End of row for about -->
        </v-card-text>
        <!-- End of card text for displaying the about of the worker -->


          <v-card-actions class="mt-n9">
            <!-- Section for displaying the work success of the current user -->
            <div class="ml-3 mb-1 mt-n3">                
              <span class="text-caption font-weight-normal teal--text ml-2">
                  {{ worker.job_success}}% Job Success
              </span>
              <v-progress-linear 
                dark 
                :value="worker.job_success" 
                class="mt-1" 
                rounded height="8" 
                color="cyan" 
                style="width: 180px;">
               </v-progress-linear>
            </div>
            <!-- End of secion for showing the job success -->
            <v-spacer></v-spacer>
            <!-- Buttong for viwing the profile of the worker -->
            <v-btn  
                dark 
                x-small 
                color="teal" 
                depressed 
                text
                @click="viewProfile(worker.id)">
                <span class="text-capitalize font-weight-bold">view profile</span>
            </v-btn>
            <!-- End of button for viewing the profile of the worker -->

            <!-- Button for saving the current worker -->
            <v-btn 
              v-if="!$auth.user.saved_workers.includes(worker.id)"
              x-small 
              color="success" 
              dark 
              text
              depressed 
              class="mr-4"
              :loading="loading"
              @click="saveWorker(worker.id)">
                <span class="text-capitalize font-weight-bold">save worker</span>
                <template v-slot:loader>
                    <span class="text-caption text-capitalize font-weight-bold white--text mr-2">Saving...</span>
                    <span class="custom-loader">
                        <v-icon light color="white" small>mdi-cached</v-icon>
                    </span>
                </template>
            </v-btn>

            <v-btn  
              v-if="$auth.user.saved_workers.includes(worker.id)"
              dark 
              x-small 
              color="error" 
              depressed 
              text
              class="mr-4"
            >
              <span class="text-capitalize font-weight-bold">saved</span>
            </v-btn>
            <!-- End of button for saving the current worker -->
          </v-card-actions>
        </v-card>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2">
            <span class="text-caption font-weight-bold">
              {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
      </v-col>
    </v-row>
    <!-- End of the practitioner card -->
</template>

<script>
export default {
    // name of the component
    name: "WorkerCard",
    // props
    props: {
        worker: {
            type: Object
        }
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
      // snackbar
      snackbar: false
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

        // function for showing more
        showMore(workerId) {
          this.$store.commit('contractors/TOGGLE_SHOW_MORE', {contractorId: workerId})
        },

        // function of viewing profile
        viewProfile(workerId) {
            // emit an event
            this.$emit('view-profile', workerId)
        },

        // function for saving the worker
        async saveWorker(workerId) {
          // set the loading to true
          this.loading = true
          // set the loader to tloading
          this.loader = this.loading
          // send the data to the db
          await this.$axios.post(`contractors/${workerId}/save`)
            .then(({ data }) => {
              this.$auth.fetchUser()
                .then(() => {
                  // set the message
                  this.message = data.data.details
                  // set the loading to false
                  this.loading = false
                  // set the loader to null
                  this.loader = null
                  // set the snackbar to true
                  this.snackbar = true
                })
            })
            // handle the error
            .catch(err => {
              // check if there is a response
              if (err.response) {
                // get the response data
                let { data } = err.response.data
                // set the message
                this.message = data.errors.details
              } else {
                // access the error
                this.message = 'Failed. Contractor could not be saved. Please try again later.'
              }
              // set the snackbar to true
              this.snackbar = true
              // set the loading to false
              this.loading = false
              // set the loader to null
              this.loader = null
            })
        }
    }
}
</script>