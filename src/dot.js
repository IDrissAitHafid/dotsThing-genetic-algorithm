class Dot {
    constructor(dna) {
        this.pos = createVector(width / 2, height - 5);
        this.acc = createVector();
        this.vel = createVector();
        if (dna) {
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }
        this.fitness = 0;

    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        fill(255, 255, 255, 100)
        rect(0, 0, 30, 8);
        pop();
    }

    update() {
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y > height || (this.between(this.pos.x, width / 2, width / 2 + 20) && this.between(this.pos.y, 10, 30))) {
            this.crashed = true;
            this.dead = true;
            this.acc = createVector();
            this.vel = createVector();

            /* add this condition for the obstacle */
            // } else if (this.between(this.pos.x, 20, 420) && this.between(this.pos.y, height - 200, height - 200 + 20)) {
            //     //    rect(20, height - 200, 400, 20);
            //     this.crashed = true;
            //     this.dead = true;
            //     this.acc = createVector();
            //     this.vel = createVector();

        } else if (this.pos.y < 0) {
            this.dead = true;
            this.acc = createVector();
            this.vel = createVector();
        } else {
            this.applyForce(this.dna.genes[step]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(5);
        }

    }

    between(p, x1, x2) {
        if (p >= x1 && p <= x2) {
            return true;
        } else {
            return false;
        }
    }

    //genetic algorithm part
    calcFitness() {
        this.fitness = pow(step / dist(this.pos.x, this.pos.y, target.x, target.y), 4);
        if (this.crashed) {
            this.fitness /= 10;
        }
    }

}