import { defineStore } from "pinia"
export const UseStoreModule = defineStore('Module', {
    state: () => ({
        _type: 'LB',
    }),
    getters: {
        moduleType:({_type}) => _type
    },
    actions: {
        setType(type) {
            this._type = type
        }
    }
})
