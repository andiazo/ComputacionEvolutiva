function evolutionaryAlgorithm(popsize, iters, opers) {
	let population = generationPopulation(popsize);
	console.log('> population:', population);
	let fitness = evaluate(phenotypes(population));
	console.log('> fitness:', fitness);
	for (let i = 1; i < iters; i++) {
		let offspring = mate(population, opers);
		let fitnessOffspring = evaluateOffspring(phenotypes(offspring));
		population = select(population, offspring, fitness, fitnessOffspring);
	}
	return population;
}

function mate(parents, opers) {
	let offspring = [];
	for (let i = 0; i < parents.length; i++) {
		let oper = chooseOpers(opers);
		let partners = choosePartners(parents, i, oper);
		let childs = oper.apply(partners);
		offspring.push(childs);
	}
	return offspring;
}

function evaluate(phenotypes) {
	let performance = [];
	for (let i = 0; i < phenotypes.length; i++)
		performance.push(rastrigin(phenotypes[i]));
	return performance;
}

function evaluateOffspring(phenotypes) {
	return evaluate(phenotypes);
}

function rastrigin(x) {
	const n = x.length;
	const A = 10;
	let sum = x.map((x_i) => x_i ** 2 - A * Math.cos(2 * Math.PI * x_i));
	sum = sum.reduce((a, b) => a + b);
	return A * n + sum;
}

function generationPopulation(popsize) {
	// Individual
	// genotype (Arreglo binario)
	// phenotype (números -> x, y)
	let population = [];
	for (let i = 0; i < popsize; i++) {
		let phenotype = [random(-5.12, 5.12), random(-5.12, 5.12)];
		population.push(phenotype);
	}
	return population;
}

function phenotypes(population) {
	return population;
}

function random(min, max) {
	return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function mix(parents) {
	return [parents[0][0], parents[1][1]];
}

function chooseOpers(opers) {
	return opers[0];
}

function choosePartners(parents, i, oper) {
	let parentA = getRandomItem(parents);
	let parentB = getRandomItem(parents);
	return [parentA, parentB];
}

function getRandomItem(arr) {
	// get random index value
	const randomIndex = Math.floor(Math.random() * arr.length);
	// get random item
	const item = arr[randomIndex];
	return item;
}

function select(population, offspring, fitness, fitnessOffspring) {
	let popsize = population.length;
	let offsize = offspring.length;
	let popfit = []
	for (let i = 0; i < offsize; i++) {
		popfit.push([offspring[i], fitnessOffspring[i]])
	}
	for (let i = 0; i < popsize; i++) {
		popfit.push([population[i], fitness[i]])
	}
	popfit.sort(function(a,b) {
		return a[1] - b[1]
	})
	let result = []
	for (let i = 0; i < popsize; i++) {
		result.push(popfit[i][0])
	}
	return result;
}

function run() {
	let opers = [
		{
			apply: mix,
		},
	];
	let population = evolutionaryAlgorithm(20, 100, opers);
	console.log('running', population);
	console.log(population.length)
	console.log(evaluate(phenotypes(population)))
}

run();
