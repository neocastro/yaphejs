/**
 * 
 *  A sum type of 9 elements
 * 
 *  HandRank = HighCard
 *            | Pair
 *            | TwoPair
 *            | Trips
 *            | Straight
 *            | Flush
 *            | FullHouse
 *            | Quads
 *            | StraightFlush
 * 
 */

const daggy = require('daggy')
const { hasLengthN, quickSort } = require('./utils')

const { 
  all, length, always, 
  path, sort, subtract,  
  T, groupBy, values
} = require('ramda')

const { 
  Any, and, compose, 
  ifElse, curry, equals, 
  map, Max, fst,
  Min, Pair, or,
  mreduceMap
} = require('crocks')

const { showADT } = require('./utils')

const K = always

const HandRank = daggy.taggedSum('HandRank',{
    HighCard:      [],
    Pair:          [],
    TwoPair:       [],
    Trips:         [],
    Straight:      [],
    Flush:         [],
    FullHouse:     [],
    Quads:         [],
    StraightFlush: []
})


/**
* 
*  Making sure we use the pretty
*  version when displaying our ADT    
*  @returns {string} 
*
*/

HandRank.prototype.show = function() {
  return this.cata({
    HighCard:      K('HighCard'),
    Pair:          K('Pair'),
    TwoPair:       K('TwoPair'),
    Set:           K('Set'),
    Trips:         K('Trips'),
    Straight:      K('Straight'),
    Flush:         K('Flush'),
    FullHouse:     K('FullHouse'),
    Quads:         K('Quads'),
    StraightFlush: K('StraightFlush')
  })
}

/**
 * 
 *  Implementing Setoid (Eq) 
 *  
 *  @param {HandRank} - another HandRank to be compared with
 *  @returns {boolean} - whether the HandRanks are the same or not 
 * 
 *  This boring boilerplate is the wiring which will
 *  allow us to make simpler functions for when
 *  comparing cards.
 * 
 *  This will be useful when trying to find the
 *  highest HandRank a Board has    
 * 
 * 
 */

HandRank.prototype.equals = function(that) {
    return this.cata({
        HighCard: K(that.cata({
                  HighCard:      T,
                  Pair:          F,
                  TwoPair:       F,
                  Trips:         F,
                  Straight:      F,
                  Flush:         F,
                  FullHouse:     F,
                  Quads:         F,
                  StraightFlush: F
        })),
  
        Pair: K(that.cata({
              HighCard:      F,
              Pair:          T,
              TwoPair:       F,
              Trips:         F,
              Straight:      F,
              Flush:         F,
              FullHouse:     F,
              Quads:         F,
              StraightFlush: F
        })),
        
        TwoPair: K(that.cata({
                 HighCard:      F,
                 Pair:          F,
                 TwoPair:       T,
                 Trips:         F,
                 Straight:      F,
                 Flush:         F,
                 FullHouse:     F,
                 Quads:         F,
                 StraightFlush: F
        })),
        
        Trips: K(that.cata({
                 HighCard:      F,
                 Pair:          F,
                 TwoPair:       F,
                 Trips:         T,
                 Straight:      F,
                 Flush:         F,
                 FullHouse:     F,
                 Quads:         F,
                 StraightFlush: F
        })),
        
        Straight: K(that.cata({
                 HighCard:      F,
                 Pair:          F,
                 TwoPair:       F,
                 Trips:         F,
                 Straight:      T,
                 Flush:         F,
                 FullHouse:     F,
                 Quads:         F,
                 StraightFlush: F
        })),
        
        Flush: K(that.cata({
                 HighCard:      F,
                 Pair:          F,
                 TwoPair:       F,
                 Trips:         F,
                 Straight:      F,
                 Flush:         T,
                 FullHouse:     F,
                 Quads:         F,
                 StraightFlush: F
        })),
        
        FullHouse: K(that.cata({
                 HighCard:      F,
                 Pair:          F,
                 TwoPair:       F,
                 Trips:         F,
                 Straight:      F,
                 Flush:         F,
                 FullHouse:     T,
                 Quads:         F,
                 StraightFlush: F
        })),
        
        Quads: K(that.cata({
                 HighCard:      F,
                 Pair:          F,
                 TwoPair:       F,
                 Trips:         F,
                 Straight:      F,
                 Flush:         F,
                 FullHouse:     F,
                 Quads:         T,
                 StraightFlush: F
        })),
        
        StraightFlush: K(that.cata({
                 HighCard:      F,
                 Pair:          F,
                 TwoPair:       F,
                 Trips:         F,
                 Straight:      F,
                 Flush:         F,
                 FullHouse:     F,
                 Quads:         F,
                 StraightFlush: T
        }))
    })
  }




/**
* 
*  Implementing Ord
*  
*  @param {HandRank} - another HandRank to be compared with
*  for ordering
* 
*  @returns {boolean} - whether the first HandRank
*  is less than or equal (lte) to the second 
* 
*  This boring boilerplate is the wiring which will
*  allow us to make simpler functions for when
*  evaluating boards.
* 
*  For example, when evaluating a board, we would
*  like to know the highest HandRank someone has
* 
* 
*/  
 
HandRank.prototype.lte = function (that) {
  return this.cata({
      HighCard: K(that.cata({
                HighCard:      T,
                Pair:          T,
                TwoPair:       T,
                Trips:         T,
                Straight:      T,
                Flush:         T,
                FullHouse:     T,
                Quads:         T,
                StraightFlush: T
      })),

      Pair: K(that.cata({
            HighCard:      F,
            Pair:          T,
            TwoPair:       T,
            Trips:         T,
            Straight:      T,
            Flush:         T,
            FullHouse:     T,
            Quads:         T,
            StraightFlush: T
      })),
      
      TwoPair: K(that.cata({
               HighCard:      F,
               Pair:          F,
               TwoPair:       T,
               Trips:         T,
               Straight:      T,
               Flush:         T,
               FullHouse:     T,
               Quads:         T,
               StraightFlush: T
      })),
      
      Trips: K(that.cata({
               HighCard:      F,
               Pair:          F,
               TwoPair:       F,
               Trips:         T,
               Straight:      T,
               Flush:         T,
               FullHouse:     T,
               Quads:         T,
               StraightFlush: T
      })),
      
      Straight: K(that.cata({
               HighCard:      F,
               Pair:          F,
               TwoPair:       F,
               Trips:         F,
               Straight:      T,
               Flush:         T,
               FullHouse:     T,
               Quads:         T,
               StraightFlush: T
      })),
      
      Flush: K(that.cata({
               HighCard:      F,
               Pair:          F,
               TwoPair:       F,
               Trips:         F,
               Straight:      F,
               Flush:         T,
               FullHouse:     T,
               Quads:         T,
               StraightFlush: T
      })),
      
      FullHouse: K(that.cata({
               HighCard:      F,
               Pair:          F,
               TwoPair:       F,
               Trips:         F,
               Straight:      F,
               Flush:         F,
               FullHouse:     T,
               Quads:         T,
               StraightFlush: T
      })),
      
      Quads: K(that.cata({
               HighCard:      F,
               Pair:          F,
               TwoPair:       F,
               Trips:         F,
               Straight:      F,
               Flush:         F,
               FullHouse:     F,
               Quads:         T,
               StraightFlush: T
      })),
      
      StraightFlush: K(that.cata({
               HighCard:      F,
               Pair:          F,
               TwoPair:       F,
               Trips:         F,
               Straight:      F,
               Flush:         F,
               FullHouse:     F,
               Quads:         F,
               StraightFlush: T
        }))
    })
}

/**
 * 
 *  Whenever cards are grouped by Rank, we can only have
 *  the following shapes: 
 * 
 * 
 *   A) All different ranks:
 * 
 *           [ [rank1] [rank2] [rank3] [rank4] [rank5] ]
 * 
 *         -  length: 5
 *         -  group sizes: 
 *               - max: 1
 *               - min: 1
 * 
 * 
 *      This shape doesn't tell us much, it could be only High Card but
 *      it could also be a Flush, a Straight or even a Straight Flush! 
 * 
 *    B) A single Pair:
 *  
 *          [ [rank1] [rank2] [rank3] [rank4] ]
 * 
 *        - length: 4 
 *        - group sizes: 
 *              - max: 2
 *              - min: 1 
 * 
 * 
 *    C)  Either TwoPair or Trips
 *      
 *          [ [rank1] [rank2] [rank3] ]
 * 
 *       - length: 3
 *       - group sizes: 
 *               - [ [2] [2] [1] ] => Two Pair     
 *               - [ [3] [1] [1] ] => Trips
 * 
 * 
 *    D) Either FullHouse or Quads
 * 
 *          [ [rank1] [rank2] ]
 * 
 *       - length: 2
 *       - group sizes: 
 *              - [ [4] [1] ] => Quads
 *              - [ [3] [2] ] => FullHouse           
 *   
 *   
 * 
 */


// groupByRank :: [ Card ] -> [ [Card] ] 
const groupByRank  = compose(values, groupBy (path ([ 'Rank', 'value' ])))

// groupBySuit :: [ Card ] -> [[ Card ]]
const groupBySuit = compose(values, groupBy (path ([ 'Suit', 'value' ])))
    
// groupByRankNumValue :: [ Card ] -> [[ Card ]]
const groupByRankNumValue = compose(values, groupBy (path ([ 'Rank', 'numValue' ])))

// maxGroupSizeOf :: [[a]] -> Int 
const maxGroupSizeOf = curry(
    (n, xs) => equals(n) (mreduceMap (Max) (length) (xs))
)

// minGroupSizeOf :: [[a]] -> Int
const minGroupSizeOf = curry(
  (n, xs) => equals (n) (mreduceMap (Min) (length) (xs))
)




// hasPair :: [ Card ] -> Bool
const hasPair = compose( 
  mreduceMap (Any) (hasLengthN(2)), 
  groupByRank
)

// hasTwoPair :: [ Card ] -> Bool
const hasTwoPair = compose(
  and (hasLengthN (3)) (maxGroupSizeOf (2)),
  groupByRank
)

// hasTrips :: [ Card ] -> Bool
const hasTrips = compose(
  and (hasLengthN (3)) (maxGroupSizeOf (3)),
  groupByRank
)

// isSequence :: [ Int ] -> Bool 
const isSequence = ([a,b,c,d,e]) => all (equals (1)) ([b-a,c-b,d-c,e-d])

// isWheel :: [ Int ] -> Bool
const isWheel = equals ([14,2,3,4,5])

// isBroadway :: [ Int ] -> Bool
const isBroadway = equals ([10,11,12,13,14])


// hasStraight :: [ Card ] -> Bool
const hasStraight = compose(
  ifElse (or (isWheel) (isBroadway)) (T) (isSequence),
  sort (subtract), 
  map (path ([ 'Rank', 'numValue' ]))
)

// hasFlush :: [ Card ] -> Bool
const hasFlush = compose(hasLengthN(1), groupBySuit)

// hasFullHouse :: [ Card ] -> Bool
const hasFullHouse = and (hasLengthN (2)) (maxGroupSizeOf (3))

// hasQuads :: [ Card ] -> Bool
const hasQuads = and (hasLengthN (2)) (maxGroupSizeOf (4))

// hasStraightFlush :: [ Card ] -> Bool
const hasStraightFlush = and (hasStraight) (hasFlush)


// mkHit :: HandRank -> Pred a -> Pair HandRank Pred
const mkHit = curry(
  (handRank, pred) => Pair(handRank,pred)
)

// hitPair :: [ Card ] -> Pair String Sum 
const hitPair = mkHit (showADT (HandRank.Pair)) (hasPair)

// hitTwoPair :: [ Card ] -> Pair String Sum
const hitTwoPair = mkHit (showADT (HandRank.TwoPair)) (hasTwoPair)
  
// hitTrips :: [ Card ] -> Pair String Sum
const hitTrips = mkHit (showADT (HandRank.Trips)) (hasTrips)

// hitStraight :: [ Card ] -> Pair String Sum
const hitStraight = mkHit (showADT (HandRank.Straight)) (hasStraight)

// hitFlush :: [ Card ] -> Pair String Sum
const hitFlush = mkHit (showADT (HandRank.Flush)) (hasFlush)

// hitFullHouse :: [ Card ] -> Pair String Sum
const hitFullHouse = mkHit (showADT (HandRank.FullHouse)) (hasFullHouse)

// hitQuads :: [ Card ] -> Pair String Sum
const hitQuads = mkHit (showADT (HandRank.Quads)) (hasQuads)

// hitStraightFlush :: [ Card ] -> Pair String Sum
const hitStraightFlush = mkHit (showADT (HandRank.StraightFlush)) (hasStraightFlush)


const possibleHits = [
  hitPair, 
  hitTwoPair, 
  hitTrips, 
  hitStraight, 
  hitFlush, 
  hitFullHouse, 
  hitQuads,
  hitStraightFlush
]


const handRanks = map (fst) (possibleHits)


module.exports = { possibleHits, handRanks }




