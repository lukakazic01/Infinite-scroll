import Home from "@/views/HomeView.vue";
import Character from "@/views/CharacterView.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/:characterName/:id', component: Character}
]

export default routes;