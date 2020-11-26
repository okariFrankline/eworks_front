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
                        <img :src="worker.profile_pic ? worker.profile_pic : '/images/unknown1.png'">
                    </v-avatar>
                    <span class="teal--text mr-3 text-capitalize font-weight-bold text-caption ml-2 mb-n2">
                        {{ worker.full_name }}
                    </span>
                  </v-btn>
                  <!-- End of the button -->
                </template>

                <v-list dense shaped v-if="worker.profile_pic">
                  <v-list-item color="purple darken-3" class="text--red mb-n2">
                    <v-list-item-title>
                        <!-- Full image of the user -->
                        <v-avatar class="profile" color="grey" size="124" rounded>
                            <v-img :src="worker.profile_pic"></v-img>
                        </v-avatar>
                        <!-- End of the full image -->
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              
                              
              <v-spacer></v-spacer>
            
              <!-- Rating if the current user -->
              <div class="mr-3 mt-n2">
                <v-row class="mt-n1 mb-n2">
                    <v-col class="mr-5">
                        <span class="text-caption font-weight-bold teal--text mr-3">Rating:</span>
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
                    <span id="dots-1" :style="worker.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="worker.show_more ? 'display: inline;' : 'display: none;'">
                        {{ show_hidden_description(worker.about )}}
                    </span>
                    <!-- Button for showing more description -->
                    <v-btn text @click="showMore" x-small>
                      <span class="text-capitalize font-weight-normal info--text"> 
                          {{worker.show_more ? 'read less' : 'read more'}} 
                      </span>
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
            <!-- Button for saving a user -->
            <v-btn  
                dark 
                x-small 
                color="teal" 
                depressed
                text
                class="mr-3"
                :loading=loading
                @click="viewProfile(worker.id)"
            >
                <span class="text-capitalize font-weight-bold">view profile</span>
                <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light color="success">mdi-cached</v-icon>
                    </span>
                </template>
            </v-btn>
            <!-- End of button for saving a user -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- End of the practitioner card -->
</template>

<script>
export default {
    // name of the component
    name: "Assignee",
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
      // loading
      hireLoading: false,
      // loader:
      hireLoader: null,
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

        // show more
        showMore() {
          this.$store.commit('direct_hire_request/TOGGLE_CONTRACTOR_SHOW_MORE')
        },

        // function for viewing the profile
        viewProfile(workerId) {
            this.$emit('view-profile', workerId)
        }

    }
}
</script>
