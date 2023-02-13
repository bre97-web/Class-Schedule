
const GridStore = {
    namespaced: true,
    state: {
        grid: JSON.parse(localStorage.getItem('grid')) || {
            x: '7',
            y: '6',
            divide: '4',
        },
    },
    getters: {
        get: (state) => state.grid,
    },
    actions: {
        set(miniStore, {x, y, divide}) {
            if(x <= 0 || y <= 0 || divide <= 0) {
                return null
            }
            miniStore.commit('SET', {x, y, divide})
        },
        save(miniStore) {
            miniStore.commit('SAVE')
        }
    },
    mutations: {
        SET(state, v) {
            state.grid = {
                x: v.x,
                y: v.y,
                divide: v.divide,
            }
        },
        SAVE(state) {
            localStorage.setItem('grid', JSON.stringify(state.grid))
        },
    }
}

export default GridStore