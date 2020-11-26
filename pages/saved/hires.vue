<template>
  <v-col md=6 class="ml-n3 mt-n1">
    <!-- SavedWorkerCard -->
    <SavedWorkerCard 
      :workers="workers"
      @unsave-hire="unsave_hire"
      @direct-hire="direct_hire"
      @view-profile="view_profile"
    />
    <!-- End of SavedWorkerCard -->
  </v-col>
</template>

<script>
  // import saved worker card
  import SavedWorkerCard from "~/components/worker/SavedWorkerCard"

  export default {
    // layout
    layout: 'main',
    // components
    components: {
      SavedWorkerCard
    },
    // data
    data: () => ({
      workers: [
        {
          id: 1,
          full_name: "Frankline Okari",
          job_success: 50,
          profile_pic: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
          rating: 3.5,
          show_more: false,
          skills: [
            "Android Developer",
            "Web App Developer",
            "IOS Developer"
          ],
          about: `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
          `,
        },
        {
          id: 2,
          full_name: "Ryan Paul",
          job_success: 20,
          profile_pic: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
          rating: 3.5,
          show_more: false,
          skills: [
            "Android Developer",
            "Web App Developer",
            "IOS Developer"
          ],
          about: `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
          `,
        },
        {
          id: 3,
          full_name: "Donna Njoki",
          job_success: 80,
          profile_pic: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
          rating: 3.5,
          show_more: false,
          skills: [
            "Android Developer",
            "Web App Developer",
            "IOS Developer"
          ],
          about: `
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
          `,
        },
      ],
    }),

    // methods
    methods: {
      // function for unsaving the worker
      unsave_hire(worker_id) {
        // log the worker id
        console.log(worker_id)
      },

      // function for directly hiring the worker
      direct_hire(worker_id) {
        // log the id
        console.log(worker_id)
      },

      // view profile
      view_profile(worker_id) {
        // log the worker id
        console.log(worker_id)
      }
    },
  }
</script>