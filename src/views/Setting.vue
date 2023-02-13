<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            grid: {
                x: 7,
                y: 0,
                divide: 4,
            },
            show: true,
        }
    },
    computed: {
        ...mapGetters('GridStore', ['get']),
    },
    methods: {
        ...mapActions('GridStore', ['set', 'save']),

        commit() {
            this.set(this.grid)
            this.save()
            this.close()
        },
        cancel() {
            this.show = false
            setTimeout(() => this.close(),250)
        },
        close() {
            this.$router.push('/')
        }
    },
    mounted() {
        this.grid.divide = this.get.divide
        this.grid.x = this.get.x
        this.grid.y = this.get.y
    },
}
</script>

<template>

    <Transition name="mask" appear>
        <div v-show="show" class="bg-black opacity-50 noAnimation fixed top-0 left-0 w-screen h-screen z-0"></div>
    </Transition>    
    <transition name="window" appear>
        <dialog v-show="show" class="fixed top-40 left-0 w-3/4 h-96 max-w-lg flex flex-col gap-2 rounded-3xl shadow-xl pl-4 overflow-hidden z-20 bg-white dark:bg-slate-800 text-black dark:text-white">

            <header>
                <h1 class="text-2xl font-bold">Edit Grid</h1>
            </header>

            <main>
                <div class="flex flex-col items-start justify-center">
                    <label>Grid X</label>
                    <input v-model.number="grid.x" disabled>
                    <label>Grid Y</label>
                    <input v-model.number="grid.y">
                    <label>Divide</label>
                    <input v-model.number="grid.divide">
                </div>
            </main>

            <footer>
                <div class="absolute bottom-0 left-0 w-full h-16 bg-gray-200 flex items-center justify-end px-8">
                    <button @click="cancel" class="red">Cancel</button>
                    <button @click="commit" class="green">Save</button>
                </div>
            </footer>
        </dialog>
    </transition>

</template>

<style scoped>
    .noAnimation {
        transition: none;
    }

    button {
        @apply rounded-full px-4 py-2 w-24 font-bold;
    }
    button.red {
        @apply hover:bg-red-500 text-black hover:text-white;
    }
    button.green {
        @apply hover:bg-green-500 text-black hover:text-white;
    }

    label {
        @apply font-medium;
    }
    input {
        @apply py-2 px-4 border rounded-md outline-none focus:ring;
    }

    * {
        @apply ring-black;
    }

    .window-enter-active {
        animation: leadingBody 0.25s;
    }
    .window-leave-active {
        animation: leadingBody 0.25s reverse;
    }

    @keyframes leadingBody {
        0% {
            opacity: 0;
            top: 8rem;
        } 100% {
            opacity: 1;
            top: 10rem;
        }
    }

    .mask-enter-active {
        animation: leadingMask 0.25s;
    }
    .mask-leave-active {
        animation: leadingMask 0.25s reverse;
    }

    @keyframes leadingMask {
        0% {
            opacity: 0;
        } 100% {
            opacity: 0.5;
        }
    }
</style>