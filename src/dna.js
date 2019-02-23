class DNA {

    constructor() {
        this.genes = [];
        for (let i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.3);
        }
    }

    crossover(partner) {
        var child = new DNA();
        var midpoint = lifespan / 2;
        for (let i = 0; i < lifespan; i++) {
            if (i < midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i]
            }
        }

        return child;
    }

    mutate(mr) {
        var p = random(1);
        for (let i = 0; i < lifespan; i++) {
            if (p < mr) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.3);

            }
        }
    }
}