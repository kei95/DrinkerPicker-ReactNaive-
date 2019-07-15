
export default class Player  {
    constructor(name, num, gap){
        this.name = name;
        this.num = num
        this.gap = gap
    }
    setNum(num) {
        this.num = num
    }
    getNum () {
        return this.num
    }
    getName() {
        return this.name
    }
    getGap() {
        return this.gap
    }
    setGap(gap) {
        this.gap = gap
    }
}

