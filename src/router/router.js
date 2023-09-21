import Home from "@/views/Home.vue";
import Character from "@/views/Character.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/:id', component: Character}
]

export default routes;