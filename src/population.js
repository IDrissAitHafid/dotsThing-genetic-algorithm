class Population {

    constructor() {
        this.dots = [];
        this.popsize = 100;
        this.generations = 1;
        this.mutationRate = 0.05;
        for (let i = 0; i < this.popsize; i++) {
            this.dots[i] = new Dot();
        }
    }



    run() {
        for (let i = 0; i < this.popsize; i++) {
            this.dots[i].show();
            this.dots[i].update();
        }
    }

    //genetic algorithm part
    calcFitness() {
        for (let i = 0; i < this.popsize; i++) {
            this.dots[i].calcFitness();
        }
    }

    naturalSelection() {
        this.maxFitness = 0;
        for (let i = 0; i < this.popsize; i++) {
            if (this.dots[i].fitness > this.maxFitness) {
                this.maxFitness = this.dots[i].fitness;
            }
        }
    }

    generate() {
        let newDots = [];
        for (var i = 0; i < this.popsize; i++) {
            let partnerA = this.acceptReject().dna;
            let partnerB = this.acceptReject().dna;
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newDots[i] = new Dot(child);
        }
        this.dots = newDots;
        console.log('length', this.dots.length);
        this.generations++;
    }

    acceptReject() {
        let i = 0;
        while (i < 10000) {
            let index = floor(random(this.popsize));
            let partner = this.dots[index];
            let r = random(this.maxFitness);
            if (r < partner.fitness) {
                return partner;
            }
            i++;
        }
        // return null;
    }

    between(p, x1, x2) {
        if (p >= x1 && p <= x2) {
            return true;
        } else {
            return false;
        }
    }

    isFinished() {
        for (let i = 0; i < this.popsize; i++) {
            if (!this.dots[i].dead) {
                return false;
            }
        }
        return true;
    }
}