const { compose, fanout, merge } = require("crocks");
const { identity, flatten, repeat, reduceRight, zip } = require("ramda");

const fisherYatesShuffle = xs => {

  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = xs[i];
    xs[i] = xs[j];
    xs[j] = temp;
  }

  return xs;
  
};

const firstHalf = xs => xs.slice(0, xs.length / 2);

const secondHalf = xs => xs.slice(xs.length / 2);

const applyN = compose(reduceRight(compose, identity), repeat)

const _riffleShuffle = compose(
  flatten,
  merge(zip),
  fanout(firstHalf, secondHalf),
  fisherYatesShuffle
)

const riffleShuffle = applyN(_riffleShuffle, 7) 

module.exports = riffleShuffle