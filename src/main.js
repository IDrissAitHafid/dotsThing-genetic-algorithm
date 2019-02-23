
var population;
var lifespan = 1000;
var step = 0;
var target;
var gen;
function setup() {
    createCanvas(600, 640);
    target = createVector(width / 2, 10);
    // this.dot = new Dot();
    population = new Population();
    gen = createP();
}

function draw() {
    background(0);
    rect(target.x, target.y, 20, 20);
    // rect(20, height - 200, 400, 20); /* add the obstacle */
    // this.dot.show();
    // this.dot.update();
    population.run();
    gen.html("Generation : " + population.generations);

    step++;
    if (step == lifespan || population.isFinished()) {
        // Calculate fitness
        population.calcFitness();
        // population = new Population();
        population.naturalSelection();
        //Create next generation
        population.generate();
        step = 0;
    }

}





