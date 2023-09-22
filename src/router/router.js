import Home from "@/views/HomeView.vue";
import Character from "@/views/CharacterView.vue";
import PageNotFound from "@/components/PageNotFound.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/:characterName/:id', component: Character},
    { path: '/:pathMatch(.*)*', component: PageNotFound }
]

export default routes;