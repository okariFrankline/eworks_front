<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <DraftInvites
            :invites="invites"
        />
        <!-- End of offer card -->
    </v-col>
    
</template>

<script>
// import OfferCard
import DraftInvites from "~/components/collaboration/DraftInvites"
// import mapGetters
import { mapState } from 'vuex'
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        DraftInvites
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('draft_invites/getDraftInvites')
            .catch(error => {
                console.log(error)
                error({
                    messsage: "An error occurred. Check your connection and try again."
                })
            })
    },
    // computed
    computed: {
        // offers
        ...mapState('draft_invites',[
            'invites'
        ]),

    },
    // data
    data: () => ({
    })
}
</script>