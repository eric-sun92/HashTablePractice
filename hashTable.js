function hashFunction(key, tableSize){
    let hash = 13
    for(let i = 0; i < key.length; i++){
        hash = 11 * hash * key.charCodeAt(i) % tableSize
    }
    return hash
}

class hashTable {

    constructor() {
        this.table = new Array(100)
        this.numItems = 0;
        this.loadFactor = this.numItems / this.table.length
    }

    resize(){

        let newTable = new Array(this.table.length * 2)

        this.table.forEach(arr => {
            if(arr){
                arr.forEach(([key, value]) => {
                    let newIndex = hashFunction(key, newTable.length)
                    if(newTable[newIndex]){
                        newTable[newIndex].push([key, value])
                    } else{
                        newTable[newIndex] = [[key, value]]
                    }
                })
            }
        })
        this.table = newTable
    }


    setValue(key, value){
        this.numItems++
        if(this.loadFactor > 0.8){
            this.resize()
        }

        let index = hashFunction(key, this.table.length)
        if(this.table[index]){
            this.table[index].push([key, value])

        } else {
            this.table[index] = [[key, value]]
        }
    }

    getValue(key) {
        let index = hashFunction(key, this.table.length)

        if(!this.table[index]){
            return null
        }
        return this.table[index].find(x => x[0] === key)[1]
    }
}

let hashTable1 = new hashTable()

hashTable1.setValue('name', 'eric')
hashTable1.setValue('age', 19)
let names = hashTable1.getValue('name')
let age = hashTable1.getValue('age')

console.log(names + age)