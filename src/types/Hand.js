const { showADT } = require('../utils') 
const { bimap, concat, curry, compose, flip, merge, Pair } = require('crocks')


/**
 * 
 *  A product type (Pair) of two Cards
 * 
 *  Hand = Card x Card 
 * 
 *  @constructor
 *  @param {Card} - a card
 *  @param {Card} - another card (they're unique)
 *   
 */

 // mkHand :: Card -> Card -> Hand 
 const mkHand = curry((c1,c2) => Pair(c1,c2))

 // showHand :: Hand -> String 
 const showHand = compose(merge(flip(concat)) , bimap (showADT) (showADT))  

module.exports = { mkHand , showHand }