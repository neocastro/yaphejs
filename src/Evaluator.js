

const {
    assign, compose, concat, 
    curry, identity, fanout, 
    fst, reduce, snd, 
    Sum, map, merge,
    Pair, objOf, mapProps, 
    valueOf 
} = require('crocks')


const {
    differenceWith, length,  memoizeWith, 
    repeat, take, unfold, 
    zipObj, zipWith
} = require('ramda')

const shuffle = require('./Shuffle')

const { possibleHits, handRanks } = require('./types/HandRank')

const { divBy, mapAllProps } = require('./utils')

// Deck :: [ Card ]
const Deck = require('./types/Deck')


// sameCard :: Card -> Card -> Bool
const sameCard = (c1,c2) => 
    c1.Rank.equals(c2.Rank) && c1.Suit.equals(c2.Suit)



// _genDeckSeed :: Hand -> [ Card ]
const _genDeckSeed = hand =>
    differenceWith (sameCard) (Deck) ([ fst (hand) , snd (hand) ])



// genDeckSeed :: Hand -> [ Card ]
const genDeckSeed = memoizeWith(identity, _genDeckSeed)



// dealFlop :: Deck -> [ Card ]
const dealFlop = compose(take(3) , shuffle)



// mkFlopSample :: Hand -> [ Card ]
const mkFlopSample = compose( 
    merge (concat),
    map (dealFlop),
    fanout (c => c.toArray()) (genDeckSeed),
    // fanout (handToCards) (genDeckSeed),
)



// concatHit :: Object -> Object -> Object
const concatHit = curry(
    (hitA, hitB) =>
        Pair(Object.keys(hitA), Pair(Object.values(hitA), Object.values(hitB))) 
            .map(merge (zipWith (concat)))                                      
            .merge(zipObj)                                                      
)




// emptyHit :: Object
const emptyHit =  zipObj (handRanks) (repeat (Sum (0)) (length (handRanks)))




// checkHits :: [ [Card] -> Bool ] -> [ Card ] -> Object
const checkHits = hitsList => cards => 
    hitsList.reduce(
        (acc, hit) => snd (hit) (cards)                                        
                   ? mapProps (objOf (fst (hit)) (concat (Sum (1)))) (acc)    
                   : acc
        , emptyHit)




// mkSample :: Hand -> Sample
const mkSample = compose( checkHits (possibleHits),  mkFlopSample )



//  generateSamples :: Int -> Hand -> [ Pair String Sum ] 
const generateSamples = curry(
    (sampleSize, hand) => unfold (x => x === sampleSize ?  false : [ mkSample (hand) , x + 1 ] ) (0)
)



// combineHits :: [ Object ] -> Object
const combineHits = compose (
    mapProps (zipObj (handRanks) (repeat (valueOf) (length (handRanks)))),
    reduce (concatHit) (emptyHit)
)

   
// summarize :: [ Object ] -> Object
const summarizeSamples = compose(
    merge ((len, summary) => assign ({ sampleSize: len }) (mapAllProps (divBy (len)) (summary))), 
    fanout (length) (combineHits)
)


// evalFiveHand :: Int -> Hand -> Object 
const evalFiveHand = sampleSize => hand =>
    compose(summarizeSamples , generateSamples (sampleSize)) (hand)



module.exports = { evalFiveHand }