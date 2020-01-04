const { length, map,  } = require('ramda')

const { 
    Pair,  constant, either, 
    compose, curry, equals, 
    mreduceMap, Sum, fromPairs, 
    toPairs, Maybe, fst, 
    snd
} = require('crocks')


const { Just , Nothing } = Maybe

const K = constant


// Show a => a -> String
const showADT = a => a.show()

// hasLengthN :: Int -> [a] -> Bool 
const hasLengthN = curry((n, xs) => equals(n)(length (xs)))


// mapAllProps :: (a -> b) -> Object -> Object
const mapAllProps = f =>
    compose( fromPairs, map (map (f)), toPairs )


// divBy :: Number -> Number -> Number    
const divBy = x => y => y / x    


// len :: [a] -> Int
const len = mreduceMap (Sum) (constant (1))

// isJust :: Maybe a -> Bool
const isJust = either (K (false)) (K (true))


// unfoldr :: (b -> Maybe (a,b)) -> b -> [a]
const unfoldr = curry(

    (f,x) => {

        const go = (fn, seed, acc) => {
            // generating the Maybe
            const res = fn (seed)
                          //ifLeft  //ifRight         
            return either 
                   (K (acc)) 
                   (pair => go (fn, snd (pair), acc.concat(fst (pair))))
                   (res)
        }

        return go (f, x, [])
    }
)

const range = curry(
    (start, stop) => unfoldr (x => x >= stop ? Nothing() : Just (Pair (x, x + 1))) (start) 
)


const hylo = curry(
    (f,g,a) => compose(f, map (hylo (f,g)),  g) (a)
)


module.exports = { 
    divBy,
    hasLengthN,
    mapAllProps,
    unfoldr,
    range,
    showADT,
    hylo,

}


