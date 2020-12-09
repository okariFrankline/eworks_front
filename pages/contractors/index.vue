<template>
  <v-col md=6 class="ml-n3 mt-n3">
    <!-- Worker card -->
    <WorkerCard 
      v-for="contractor in contractors"
      :key="contractor.id"
      :worker="contractor"
      @view-profile="viewProfile"
    />
    <!-- End of worker card -->

  </v-col>
          
</template>

<script>
// import worker card
import WorkerCard from "~/components/worker/WorkerCard"
// import the mapgetters
import { mapGetters } from "vuex"

export default {
  // layout
  layout: 'main',
  // components
  components: {
    WorkerCard
  },
  // define the head
    head: {
      // title of page
      title: 'contractors',
      // meta
      meta: [
        {
          hid: 'contractors',
          // set the name
          name: 'description',
          // set the content
          content: `Find qualified freelancers or professionally registered businesses to hire for your next project despite its scale.`
        }
      ]
    },
  // fetch
  async fetch({ store, error }) {
    // dipatch an action for getting all the workers
    await store.dispatch('contractors/listContractors')
      // handle the errors
      .catch(err => {
        // check if the error has a response
        if (error.response) {
          // return an error
          error({message: err.response.data.errors.details})
        } else {
          error({message: 'There was a problem loading the contractors. Try again later.'})
        }
      })
  },
  // computed
  computed: {
    ...mapGetters('contractors', [
      'contractors',
      'searchContractors'
    ])
  },
  // Data
  data: () => ({
    
  }),
  // methods
  methods: {
    // function for viewing the profile
    viewProfile(contractorId) {
      // take the user to the contractor id
      this.$router.push({
        path: `/contractors/${contractorId}`
      })
    }
  }
}
</script>
