<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- User profile card -->
        <UserProfileCard
            v-if="$auth.user.user_type == 'Independent Contractor'"
            :user="user"
        />
        <!-- End of user profile card -->

        <!-- User profile card -->
        <ClientProfileCard
            v-if="$auth.user.user_type == 'Client'"
            :user="user"
        />
        <!-- End of user profile card -->

        <!-- Previous hires -->
        <PreviousHireCard
            v-if="$auth.user.user_type == 'Independent Contractor'"
            :orders="previousHires"
            :full_name="user.full_name"
            @toggle-show-more="showOrderMore"
        />
        <!-- End of previous hires -->
    </v-col>
</template>

<script>
// import the user profile card
import UserProfileCard from "~/components/user/userProfileCard"
// import the Client user profile
import ClientProfileCard from "~/components/user/ClientProfileCard"
// import the previous hires
import previousHireCard from "~/components/worker/PreviousHireCard"
// import map gettes
import { mapState } from "vuex"
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        UserProfileCard,
        previousHireCard,
        ClientProfileCard
    },
    // define the head
    head: {
      // title of page
      title: 'My profile',
      // meta
      meta: [
      ]
    },
    // fetch
    async fetch({ store }) {
        // dispatch the actions
        await store.dispatch('user_profile/getMyProfile')
            // handle error
            .catch(err => {
                console.log(err)
            })
    },
    // computed
    computed: {
        // the current user
        ...mapState('user_profile', [
            'user',
            'previousHires'
        ])
    },
    // methods
    methods: {
        // function for showing the order's more details
        showOrderMore (orderId) {
            // commit to the store
            this.$store.commit('user_profile/SHOW_ORDER_MORE', {orderId: orderId})
        }
    }
}
</script>