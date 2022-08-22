export class Operator {
    constructor(idx) {
        this.oper = this.operators[idx]
    }

    operators = {
        crossover: this.crossover,
        mutation: this.mutation 
    }

    crossover (parents) {
        console.log("Crossover")
        if (parents.length < 2) {
            throw new Error("Need at least 2 parents");
        }
        let cutPoint = this.randomIntFromInterval(1, parents[0].length - 1);
        console.log(parents)
        console.log(parents[0][cutPoint])
    }


    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    mutation (parents) {
        console.log("Mutation")
    }

    apply (parents) {
        this.oper(parents)
        // console.log(this.operators)
    }
}
