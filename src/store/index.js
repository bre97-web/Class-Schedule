import { createStore } from "vuex"

import ClassStore from "./class/index.js"
import GridStore from "./Grid/index.js"

const Store = createStore({
    modules: {
        ClassStore,
        GridStore,
    },
})

export default Store