<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <MyAssignedOrders 
            :orders="orders"
            :paidCount="unPaidCount"
            :inProgressCount="inProgressCount"
            :unPaidCount="unPaidCount"
            :isClientMessage="isClientMessage"
            :showClientDialog="showClientDialog"
            @new-invite="newCollaboration"
        />
        <!-- End of offer card -->

        <!-- Dialog for creating a new job -->
        <v-dialog v-model="jobDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Select Collaboration Category and specialty
                </span>
            </v-card-title>

            <v-card-text class="mt-3">
                <v-form v-model="valid" ref="jobDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                    Q1. What is the professional category of your collaboration invite?
                  </span>
                  <!--Order type -->
                  <v-select 
                    :items="categories" 
                    prepend-icon="mdi-playlist-edit" 
                    placeholder="Choose Job Category" 
                    dense 
                    class="mt-3 mb-2" 
                    item-text="name" 
                    item-value="value" 
                    style="font-size: .9em;" 
                    :rules="selectRules"
                    v-model="formData.category"
                  ></v-select>
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q2. What specialty are you looking for in your collaboration invite?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="showServices()" 
                    prepend-icon="mdi-playlist-edit" 
                    placeholder="Choose Job Specialty" 
                    dense 
                    class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    style="font-size: .9em;"
                    :rules="selectRules"
                    v-model="formData.specialty"
                    :disabled="formData.category ? false : true"
                  ></v-select>
                  <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small
                  :disabled="loading"
                  @click="jobDialog = false"
                >cancel</v-btn>
                <!-- End of cacnel button -->

                <!-- Next button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click.stop="createNewInvite"
                >
                  continue
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Dialog for adding the type of project -->
        <v-dialog v-model="deadlineDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Collaboration Invite Deadline and required collaborators
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="deadlineDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q3. How many collaborator do you need for your project?
                  </span>
                  <v-text-field 
                    prepend-icon="mdi-account-group" 
                    placeholder="Number of required collaborators" 
                    dense 
                    class="mt-3 mb-2" 
                    style="font-size: .9em;"
                    type="number"
                    :rules="contractorsRules"
                    v-model="deadlineForm.required_collaborators"
                  ></v-text-field>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q4. Enter invite offer submission date
                  </span>
                  <!-- Bidding deadline -->
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="deadlineForm.deadline_string_date"
                            placeholder="Not accepting deadline beyond"
                            prepend-icon="mdi-calendar-outline"
                            readonly
                            style="font-size: .9em;"
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker 
                        no-title 
                        v-model="deadlineForm.deadline_string_date" 
                        @input="menu = false"
                        ></v-date-picker>
                    </v-menu>
                    <!--End of bidding deadline -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  :disabled="loading"
                  @click="deadlineDialog = false"
                >cancel</v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" color="info" 
                  small 
                  :loading="loading"
                  @click.stop="updateInviteDeadline"
                >
                  next
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for type of project -->

        <!-- Dialog for adding the payment of project -->
        <v-dialog v-model="paymentDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                    Collaboration Invite Payment Details
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="paymentDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q5. When will your payments be made?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="paymentPlans" 
                    prepend-icon="mdi-credit-card-clock-outline" 
                    placeholder="Choose Payment Schedule" 
                    dense class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    style="font-size: .9em;" 
                    :rules="selectRules"
                    v-model="paymentForm.payment_schedule"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q6. Set acceptable offer range you will pay each collaborator <span class="pink--text text-lowercase">{{paymentForm.payment_schedule}}</span>
                  </span>
                  <v-row>
                      <v-col md=5 class="mt-n3">
                          <v-text-field 
                            placeholder="Minimum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="paymentForm.min_amount"
                            :rules="amountRules"
                            :disabled="paymentForm.payment_schedule ? false : true"
                          ></v-text-field>
                      </v-col>
                      <v-col md=2 class="mt-3 ml-n5 mr-2">
                          <span class="text-body-2 font-weight-bold ml-10 primary--text">
                              To
                          </span>
                      </v-col>
                      <v-col md=5 class="mt-n3">
                          <v-text-field 
                            placeholder="Maximum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="paymentForm.max_amount"
                            :rules="amountRules"
                            :disabled="paymentForm.payment_schedule ? false : true"
                          ></v-text-field>
                      </v-col>
                  </v-row>
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Payment dialog -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  :disabled="loading"
                  @click="paymentDialog = false"
                >cancel</v-btn>
                <!-- End of cancle button -->

                <!-- Next button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click="updateInvitePayment"
                >
                  Next
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for payment of project -->

        <!-- Description dialog window -->
        <v-dialog v-model="descriptionDialog" max-width="750" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                    Collaboration Invite Description
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="descriptionDialog">
                  <span class="text-caption font-weight-bold teal--text">
                      Q5. Add a detailed description for your job and it should include:
                      <ul>
                          <li class="text-caption font-weight-normal pink--text">Detailed description of what the job entails (requirements, special considerations timelines etc)</li>
                          <li class="text-caption font-weight-normal pink--text">Detailed description of and expectations from your practioner of choice</li>
                          <li class="text-caption font-weight-normal pink--text">A detailed description of the location, if required, of where the job should take place</li>
                          <li class="text-caption font-weight-normal pink--text">Any special notes/requirements for the practioner</li>
                      </ul>
                  </span>
                  <!-- Options for the category -->
                  <v-textarea  
                    auto-grow 
                    placeholder="Order Description" 
                    counter="5000" 
                    dense 
                    class="mt-3"  
                    style="font-size: .9em;"
                    v-model="descriptionForm.description"
                    :rules="descriptionRules"
                  ></v-textarea>
                  <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  :disabled="loading"
                  @click="descriptionDialog = false"
                >cancel</v-btn>
                <!-- End of cancel button -->

                <!-- Next nutton -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click="updateInviteDescription"
                >
                  Next
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of description window -->

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" color="error lighten-1"  top app elevation="2" timeout="3000">
            <span class="text-caption font-weight-bold">
              {{ errorMessage }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-col>
    
</template>

<script>
// import OfferCard
import MyAssignedOrders from "~/components/order/MyAssignedOrders"
// import mapGetters
import { mapState, mapGetters } from 'vuex'
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        MyAssignedOrders
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('assigned_orders/getMyAssignedOrders', {filter: 'in_progress'})
    },
    // computed
    computed: {
        // offers
        ...mapState('assigned_orders',[
            'unPaidCount',
            'paidCount',
            'orders',
            'inProgressCount',
            'isClientMessage',
            'showClientDialog'
        ]),

        // invite
        ...mapState('invite', {
            invite: (state) => state.invite
        }),

        // get the select options
        ...mapState('select', {
            paymentPlans: state => state.paymentPlans,
            durations: state => state.durations,
            projectTypes: state => state.projectTypes,
            categories: state => state.categories,
            currencies: state => state.currencies,
            web: state => state.web,
            writing: state => state.writing,
            construction: state => state.construction,
            accounting: state => state.accounting,
            cleaning: state => state.cleaning,
            food: state => state.food,
            legal: state => state.legal,
            design: state => state.design,
            transport: state => state.transport,
            sales: state => state.sales,
            withdrawalOptions: state => state.withdrawalOptions
        }),
    },
     // before leave
    beforeRouteLeave (to, from, next) {
        // set the showing to unassinged
        this.$store.commit('assigned_orders/SET_SHOWING', "in progress")
        // call next
        next()
    },
    // data
    data: () => ({
        // valid
        valid: false,
        // menu
        menu: false,
        // error message
        errorMessage: '',
        // snackbar
        snackbar: false,
        // loading
        loading: false,
        // loader
        loader: null,
        // jobDialog
        jobDialog: false,
        // duration dialog
        deadlineDialog: false,
        // payment dialog
        paymentDialog: false,
        // description dialog
        descriptionDialog: false,
        // category form
        formData: {
            category: '',
            specialty: ''
        },
        // deadline forme
        deadlineForm: {
            deadline_string_date: '',
            required_collaborators: 1
        },
        // payment form
        paymentForm: {
            min_amount: '',
            max_amount: '',
            payment_schedule: ''
        },
        // description form
        descriptionForm: {
            description: ''
        },
        // select rules
        selectRules: [
            v => !!v || 'Field is required'
        ],
        // contractor rules
        contractorsRules: [
            v => !!v || 'Number of contractors must be at least be 1.'
        ],
        // amount rules
        amountRules: [
            v => !!v || 'Amount cannot be less than 0.'
        ],
        // description form
        descriptionRules: [
            v => !!v || 'Description is required.',
            v => (v && v.length >= 500) || 'Description has to have a minimum of 200 characters.'
        ]
    }),
    // methods
    methods: {
        setIsClient(message) {
            this.isClientMessage = message
        },
        // handle new collaboration
        newCollaboration(orderId) {
            // set the orderId
            this.orderId = orderId
            // set the job dialoag to true
            this.jobDialog = true
        },
        // handle error
        handleError(err) {
            // set the loading to false
            this.loading = false
            // set the loader to null
            this.loader = null
            // log the error
            console.log(err)
        },
        // function for creating a new invite
        async createNewInvite() {
            // validat the form
            if (!this.$refs.jobDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading
            
            // post the data
            await this.$store.dispatch('invite/createNewInvite', {
                data: this.formData,
                orderId: this.orderId
            })
            .then(() => {
                // reset the form
                this.$refs.jobDialog.reset()
                // set the orderId to empty
                this.orderId = ''
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.jobDialog = false
                // set the deadline dialog
                this.deadlineDialog = true
            })
            .catch(err => this.handleError(err))
        },

        // function for adding the deadline
        async updateInviteDeadline() {
            // validat the form
            if (!this.$refs.deadlineDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading

            // post the data
            await this.$store.dispatch('invite/updateInviteDeadline', {
                data: this.deadlineForm
            })
            .then(() => {
                // reset the form
                this.$refs.deadlineDialog.reset()
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.deadlineDialog = false
                // set the deadline dialog
                this.paymentDialog = true
            })
            .catch(err => this.handleError(err))
        },

        // function for updating the payment
        async updateInvitePayment() {
            // validate the form
            if (!this.$refs.paymentDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading

            // post the data
            await this.$store.dispatch('invite/updateInvitePayment', {
                data: this.paymentForm
            })
            .then(() => {
                // reset the form
                this.$refs.paymentDialog.reset()
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.paymentDialog = false
                // set the deadline dialog
                this.descriptionDialog = true
            })
            .catch(err => this.handleError(err))
        },

        // function for updating the invite description
        async updateInviteDescription() {
            // validat the form
            if (!this.$refs.descriptionDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading

            // post the data
            await this.$store.dispatch('invite/updateInviteDescription', {
                data: this.descriptionForm
            })
            .then(() => {
                // reset the dialog
                this.$refs.descriptionDialog.reset()
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.descriptionDialog = false
                // redirect to the review
                this.$router.push({
                    path: `/collaborations/${this.invite.id}/review`
                })
            })
            .catch(err => this.handleError(err))
        },

        // funciton for showing the services
        showServices() {
            switch(this.formData.category) {
                case 'Accounting and Finance': 
                    return this.accounting;
                    break;
                case 'Web, Mobile and Software':
                    return this.web;
                    break;
                case 'Construction and Repairs':
                    return this.construction;
                    break;
                case 'Cleaning Services':
                    return this.cleaning;
                    break;
                case 'Food, Catering and Nutrition':
                    return this.food;
                    break;
                case 'IT and Networking':
                    return this.it;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Transport and Delivery':
                    return this.transport;
                    break;
                case 'Writing Services':
                    return this.writing;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Branding and Design':
                    return this.design;
                    break;
                case 'Tansport and Delivery':
                    return this.transport;
                    break;
                default:
                    return this.sales;
            }
        },
    }
}
</script>