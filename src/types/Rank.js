/**
 * 
 *  A sum type of 13 elements
 * 
 *  Rank = Deuce | Three | Four 
 *       | Five  |  Six  | Seven
 *       | Eight |  Nine | Ten
 *       | Jack  | Queen | King
 *       | Ace
 * 
 */
const daggy = require('daggy')
const { constant } = require('crocks')
const { T, F } = require('ramda')

const K = constant

/**
 * 
 * Each element has two properties:
 * @param {string} - value in plain english
 * @param {Number} - numerical value to be associated with a rank
 * @returns {Rank}
 * 
 */
const Rank = daggy.taggedSum('Rank', {
    Deuce: [ 'value', 'numValue' ],
    Three: [ 'value', 'numValue' ],
    Four:  [ 'value', 'numValue' ],
    Five:  [ 'value', 'numValue' ],
    Six:   [ 'value', 'numValue' ],
    Seven: [ 'value', 'numValue' ],
    Eight: [ 'value', 'numValue' ],
    Nine:  [ 'value', 'numValue' ],
    Ten:   [ 'value', 'numValue' ],
    Jack:  [ 'value', 'numValue' ],
    Queen: [ 'value', 'numValue' ],
    King:  [ 'value', 'numValue' ],
    Ace:   [ 'value', 'numValue' ]
  })



/**
* 
*  Making sure we use the string
*  value when displaying our ADT    
*  @returns {string}
* 
*/

Rank.prototype.show = function() {
  return this.value
}


/**
 * 
 *  Implementing Setoid (Eq)
 *  
 *  @param {Rank} - another Rank to be compared with
 *  for equality
 *  
 *  @returns {boolean} - whether the Ranks are equal 
 *  or not                  
 * 
 *  This boring boilerplate is the wiring which will
 *  allow us to make simpler functions for when
 *  comparing cards.
 * 
 *  For example, when evaluating a board, we need
 *  to know how to say if two cards are equal, and
 *  for that we use the Rank :)   
 * 
 *  Were we using Haskell, this would simply be:
 * 
 *  data  Rank = Deuce | Three | Four 
 *             | Five  |  Six  | Seven
 *             | Eight |  Nine | Ten
 *             | Jack  | Queen | King
 *             | Ace 
 *      deriving (Eq)
 * 
 */

Rank.prototype.equals = function(that) {
    return this.cata({
     Deuce: K(
       that.cata({
        Deuce: T,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: F,
        Nine:  F,
        Ten:   F,
        Jack:  F,
        Queen: F,
        King:  F,
        Ace:  F
      })), 
  
     Three: K(
       that.cata({
        Deuce: F,
        Three: T,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })),
  
     Four: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: T,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })),  
  
     Five: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: T,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })), 
  
     Six: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: T,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })),
  
     Seven: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: T,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })),
  
     Eight: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: T,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })),
  
     Nine: K(that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: T,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })),
  
     Ten: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: T,
        Jack: F,
        Queen: F,
        King: F,
        Ace: F
     })
     ),
  
     Jack: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: T,
        Queen: F,
        King: F,
        Ace: F
     })),
  
     Queen: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: T,
        King: F,
        Ace: F
     })),
  
      King: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: T,
        Ace: F
     })
      ),
  
     Ace: K(
       that.cata({
        Deuce: F,
        Three: F,
        Four: F,
        Five: F,
        Six: F,
        Seven: F,
        Eight: F,
        Nine: F,
        Ten: F,
        Jack: F,
        Queen: F,
        King: F,
        Ace: T
     })
     ) 
    })
}


/**
 * 
 *  Implementing Ord 
 *  @param {Rank} - another Rank to be compared with
 *                  for ordering
 * 
 *  @returns {boolean} - whether the first Rank
 *  is less than or equal (lte) than the second
 * 
 *  This boring boilerplate is the wiring which will
 *  allow us to make simpler functions for when
 *  comparing cards.
 * 
 *  For example, when evaluating a board, we need
 *  to know how to say if two cards are equal, and
 *  for that we use the Rank :)   
 * 
 *  Were we using Haskell, this would simply be:
 * 
 *  data  Rank = Deuce | Three | Four 
 *              | Five  |  Six  | Seven
 *              | Eight |  Nine | Ten
 *              | Jack  | Queen | King
 *              | Ace 
 *         deriving (Ord)
 */

Rank.prototype.lte = function(that) {
    return this.cata({
      Deuce: K(
        that.cata({
        Deuce: T,
        Three: T,
        Four:  T,
        Five:  T,
        Six:   T,
        Seven: T,
        Eight: T,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),
  
      Three: K(
        that.cata({
        Deuce: F,
        Three: T,
        Four:  T,
        Five:  T,
        Six:   T,
        Seven: T,
        Eight: T,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),
  
      Four: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  T,
        Five:  T,
        Six:   T,
        Seven: T,
        Eight: T,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),
  
      Five: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  T,
        Six:   T,
        Seven: T,
        Eight: T,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),
  
      Six: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   T,
        Seven: T,
        Eight: T,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })
      ),
  
      Seven: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: T,
        Eight: T,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),
         
      Eight: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: T,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),
  
      Nine: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: F,
        Nine:  T,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),
  
      Ten: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: F,
        Nine:  F,
        Ten:   T,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),     
  
      Jack: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: F,
        Nine:  F,
        Ten:   F,
        Jack:  T,
        Queen: T,
        King:  T,
        Ace:   T
      })),  
  
      Queen: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: F,
        Nine:  F,
        Ten:   F,
        Jack:  F,
        Queen: T,
        King:  T,
        Ace:   T
      })),
  
      King: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: F,
        Nine:  F,
        Ten:   F,
        Jack:  F,
        Queen: F,
        King:  T,
        Ace:   T
      })),
  
      Ace: K(
        that.cata({
        Deuce: F,
        Three: F,
        Four:  F,
        Five:  F,
        Six:   F,
        Seven: F,
        Eight: F,
        Nine:  F,
        Ten:   F,
        Jack:  F,
        Queen: F,
        King:  F,
        Ace:   T
      }))
    })
}

/**
 * 
 *  Creating the values to be exported 
 * 
 */

const Deuce = Rank.Deuce('2', 2)
const Three = Rank.Three('3', 3)
const Four  = Rank.Four('4', 4)
const Five  = Rank.Five('5',5)
const Six   = Rank.Six('6',6)
const Seven = Rank.Seven('7',7)
const Eight = Rank.Eight('8',8)
const Nine  = Rank.Nine('9',9)
const Ten   = Rank.Ten('T',10)
const Jack  = Rank.Jack('J',11)
const Queen = Rank.Queen('Q',12)
const King  = Rank.King('K',13)
const Ace   = Rank.Ace('A',14)

const Ranks = [
    Deuce,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace            
]

module.exports = {
    Deuce,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace      
}