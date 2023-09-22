import HomeView from "@/views/HomeView.vue";
import CharacterView from "@/views/CharacterView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/:characterName/:id', component: CharacterView },
    { path: '/:pathMatch(.*)*', component: PageNotFoundView }
]

export default routes;