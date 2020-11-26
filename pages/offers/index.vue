<template>
    <v-col md=6 class="ml-n3 mt-n2">
        <!-- OfferCard -->
        <OfferCard 
            :pendingOffers="pendingOffers"
            :acceptedOffers="acceptedOffers"
            :rejectedOffers="rejectedOffers"
            @cancel-offer="cancel-offer"
        />
        <!-- End of offer card -->
    </v-col>
    
</template>

<script>
    // import OfferCard
import OfferCard from "~/components/offer/OfferCard"
// import mapGetters
import { mapGetters } from 'vuex'
// component definition
export default {
    // layout
    layout: 'main',
    // components
    components: {
        OfferCard
    },
    // fetch function
    async fetch({ store, error }) {
        // get the offers
        await store.dispatch('offers/getOffers')
            .catch(err => {
                console.log(err)
                // check if the error has response
                if (err.response) {
                    console.log(err.response)
                    // get the errors
                    //let { data } = err.response
                    // show the error page
                    //error({message: data.errors.details, statusCode: err.response.status})
                } else {
                    // log the errors
                    console.log(err)
                    // show the error page
                    error({message: 'There was a problem getting your offers. Try again later.'})
                }
            })
    },
    // computed
    computed: {
        // offers
        ...mapGetters('offers', [
            'pendingOffers',
            'acceptedOffers',
            'rejectedOffers'
        ])
    },
    // data
    data: () => ({
        showLess: true,
        // offers: [
        //     {
        //         id: 1,
        //         asking_amount: "20000",
        //         is_rejected: false,
        //         is_accepted: true,
        //         is_pending: false,
        //         owner: {
        //             id: 1,
        //             show_more: false,
        //             about: `
        //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
        //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
        //             `,
        //         },
        //         order: {
        //             id: 1,
        //             category: 'Mobile Development'
        //         }
        //     },
        //     {
        //         id: 2,
        //         asking_amount: "20000",
        //         is_rejected: false,
        //         is_accepted: false,
        //         is_pending: true,
        //         owner: {
        //             id: 2,
        //             show_more: false,
        //             about: `
        //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
        //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
        //             `,
        //         },
        //         order: {
        //             id: 2,
        //             category: 'Mobile Development'
        //         }
        //     },
        //     {
        //         id: 3,
        //         asking_amount: "20000",
        //         is_rejected: true,
        //         is_accepted: false,
        //         is_pending: false,
        //         owner: {
        //             id: 3,
        //             about: `
        //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
        //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
        //             `,
        //         },
        //         order: {
        //             id: 3,
        //             show_more: false,
        //             category: 'Mobile Development'
        //         }
        //     },
        // ],
    }),
    // methods
    methods: {
        // function for cancelling offers
        cancel_offers(offer_id) {
            // log the offer
            console.log(offer_id)
        }
    }
}
</script>