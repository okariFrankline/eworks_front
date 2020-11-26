<template>
  <v-col md=6 class="ml-n3 mt-n2">
    <!-- WorkerProfileCard -->
    <WorkerProfileCard 
      :worker="worker"
      @save-user="save_user"
    />
    <!-- End of WorkerProfileCard -->

    <!-- Previous hire card -->
    <PreviousHireCard 
      :orders="orders"
    />
    <!-- End of previous hire card -->
  </v-col>
</template>

<script>
  // import workprofile card
  import WorkerProfileCard from "~/components/worker/WorkerProfileCard"
  // import previous hires
  import PreviousHireCard from "~/components/worker/PreviousHireCard"

  export default {
    // layout
    layout: 'main',
    // components
    components: {
      WorkerProfileCard,
      PreviousHireCard
    },
    data: () => ({
      worker: {
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
      // test orders
      orders: [
        {
          id: 1,
          category: "Web & Mobile Software Development",
          owner_name: "Frankline Okari",
          rating: 3.5,
          comment: `
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam!
          `,
          description: `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
          `,
          show_more: false
        },
        {
          id: 2,
          category: "Web & Mobile Software Development",
          owner_name: "Frankline Okari",
          rating: 3.5,
          comment: `
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam!
          `,
          description: `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
          `,
          show_more: false
        },
        {
          id: 3,
          category: "Web & Mobile Software Development",
          owner_name: "Frankline Okari",
          rating: 3.5,
          comment: `
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam!
          `,
          description: `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam in ad, incidunt odio consequatur neque facilis eligendi? Reprehenderit error quam deleniti eligendi, itaque blanditiis illo voluptate nisi, obcaecati nulla modi corrupti. Ducimus unde dolorum maiores minima quas amet, velit cum odio dolores necessitatibus sequi, sed quaerat voluptatem eius ratione veniam?
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis dolor necessitatibus consequatur quos ullam quaerat distinctio voluptates, earum voluptatem in eaque, voluptatum maiores, non unde impedit suscipit molestiae cum quibusdam vero quas. Quia aliquid rem itaque sed ad laudantium ipsam delectus incidunt, molestias assumenda. Quasi, magni? Accusamus aliquam quis consequuntur, perferendis odit ducimus eveniet ut accusantium veritatis excepturi. Inventore temporibus, quos exercitationem nobis fugit, unde atque quas quae officia rem, expedita reprehenderit vitae voluptatem voluptas? Doloremque fugiat necessitatibus placeat incidunt reiciendis quod alias qui, dolor numquam dicta, error repudiandae vel adipisci eligendi aliquam expedita quos. Perspiciatis neque ipsam repellendus! Qui reprehenderit, laboriosam iste, et corrupti adipisci ullam sunt eius incidunt praesentium excepturi amet minima temporibus quibusdam mollitia dolorem illum ab ad fugit? Voluptates, corrupti maiores! Omnis qui molestias hic odit, incidunt, culpa ullam natus autem obcaecati voluptatum, distinctio sit repellat minima consequatur vero amet impedit quisquam vel eum accusantium ipsum!
          `,
          show_more: false
        },
      ],
    }),

    // methods
    methods: {
      // function for saving the user
      save_user(worker_id) {
        // log the id
        console.log(worker_id)
      }

    },
  }
</script>

