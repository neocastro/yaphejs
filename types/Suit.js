/**
 * 
 *  A sum (coproduct) type of four elements
 * 
 *  Suit = Clubs | Diamonds | Hearts | Spades
 * 
 */

const daggy = require('daggy')

/**
 * 
 * Each element has two properties:
 * @param {string} - value in plain english like: clubs, spades, hearts
 * @param {string} - unicode value for the suit
 * @returns {Suit}
 * 
 */

const Suit = daggy.taggedSum('Suit', {
    Clubs:    [ 'value', 'pretty' ],
    Diamonds: [ 'value', 'pretty' ],
    Hearts:   [ 'value', 'pretty' ],
    Spades:   [ 'value', 'pretty' ],
})


/**
 * 
 *  Making sure we use the pretty
 *  version when displaying our ADT    
 *  @returns {string} 
 * 
 */

Suit.prototype.show = function() {
    return `${this.pretty}`
}


/**
 * 
 *  Implementing Setoid (Eq)
 *  @param {Suit} - another suit to be compared with for equality
 *  @returns {boolean} - whether suits are equal or not
 * 
 */

Suit.prototype.equals = function(otherSuit) {
    return this.value === otherSuit.value 
}


/**
 * 
 *  Creating the values to be exported 
 * 
 */

const Clubs    = Suit.Clubs('clubs','♣')
const Diamonds = Suit.Diamonds('diamonds','♦')
const Hearts   = Suit.Hearts('hearts','♥')
const Spades   = Suit.Spades('spades', '♠')

const Suits = [
    Clubs,
    Diamonds,
    Hearts,
    Spades
]


module.exports = { Clubs, Diamonds, Hearts, Spades }


