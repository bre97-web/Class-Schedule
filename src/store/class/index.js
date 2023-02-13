
import { timeStamp } from "../../assets/time"

const ClassStore = {
    namespaced: true, 
    state: {
        /**
         * 存储在浏览器本地中的信息。不存在时为空的数组。
         */
        class: JSON.parse(localStorage.getItem('class')) || [],
        
    },
    getters: {
        /**
         * 
         * @param {*} state 
         * @returns 得到完整的state.class。
         */
        get: (state) => state.class,
        
    },
    actions: {
        /**
         * 向state.class中添加e元素，e为一个对象。
         * @param {*} miniStore 
         * @param {Object} e 将要添加到miniStore.state.class的元素副本。
         */
        add(miniStore, e) {
            if(e.text === '' || e.text == null) {
                return null
            }

            
            miniStore.commit('ADD', e)
        },
        edit(miniStore, e) {
            if(e.text === '' || e.text == null) {
                return null
            }
            
            if(miniStore.state.class.filter(el => el.index == e.index).length >= 2) {
                return null
            }
            
            miniStore.commit('EDIT', e)
        },
        remove(miniStore, e) {
            miniStore.commit('REMOVE', e)
        },
        save(miniStore) {
            miniStore.commit('SAVE')
        },
    },
    mutations: {
        ADD(state, e) {
            state.class.push({
                /**
                 * text为课程名。
                 */
                text: e.text,
                
                x: e.x,
                y: e.y,
                
                /**
                 * time是课程时间。time应该包括start和end。
                */
               time: e.time,
               
               /**
                 * index是唯一的，它用做一个class的标记。数据来自UNIX时间戳。
               */
              index: timeStamp(),
            })  
        },
        REMOVE(state, e) {
            state.class = state.class.filter(el => el !== e)
        },
        
        EDIT(state, e) {            
            for(let el in state.class) {
                if(state.class[el].index == e.index) {
                    state.class[el].text = e.text
                    state.class[el].x = e.x
                    state.class[el].y = e.y
                    break
                }
            }
        },
        SAVE(state) {
            localStorage.setItem('class', JSON.stringify(state.class))
        },
    },
}

export default ClassStore