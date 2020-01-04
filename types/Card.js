/**
 * 
 *  A product type of Rank and Suit
 * 
 *  Card = Rank x Suit 
 * 
 */

const { curry } = require('crocks')
// const { Rank }  = require('./Rank')
// const { Suit }  = require('./Suit')
const daggy     = require('daggy')


/**
 * 
 *  Card = Card Rank Suit 
 *  @param {Rank}
 *  @param {Suit}
 * 
 */
const Card = daggy.tagged('Card', [ 'Rank', 'Suit' ])

/**
* 
*  Making sure we use the pretty
*  version when displaying our ADT    
*  @returns {string} 
*/
Card.prototype.show = function () {
  return `${this.Rank.value}${this.Suit.pretty}`
} 

/**
 * 
 *  Implementing Setoid (Eq) 
 *  
 *  @param {Card} - another Card to be compared with
 *  @returns {boolean} - whether the cards are equal or not (using Rank)
 * 
 *  This boring boilerplate is the wiring which will
 *  allow us to make simpler functions for when
 *  comparing cards.
 * 
 *  For example, when evaluating a board, we need
 *  to know how to say if two cards are equal, and
 *  for that we use the Rank :)   
 * 
 *  Since Rank also implements Eq (see Rank for details),
 *  we can simply use that.
 * 
 */

 Card.prototype.equals = function(that) {
   console.log("Dentro do equals this.Rank:", Object.keys(this.Rank));
   
  return this.Rank.equals(that.Rank)
}

/**
 * 
 *  Implementing Ord
 *  
 *  @param {Card} - another Card to be compared with
 *  for ordering
 * 
 *  @returns {boolean} - whether the first Card
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
 *  Since Rank also implements Ord (see Rank for details),
 *  we can simply use that.
 * 
 */

 Card.prototype.lte = function (that) {
     return this.Rank.lte(that.Rank)
 }


/**
 * 
 *  @constructor
 *  @param {Rank} 
 *  @param {Suit} 
 *  @returns {Card}    
 * 
 */

const mkCard = curry(
    (Rank, Suit) => Card(Rank,Suit)
)

module.exports = mkCard