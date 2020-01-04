const mkCard = require('./Card')
const Rank = require('./Rank')
const Suit = require('./Suit')
const { flip, liftA2 } = require('crocks')


const Ranks = Object.values(Rank)
const Suits = Object.values(Suit)

// Deck :: [ Card ]
const Deck = liftA2 (flip (mkCard)) (Suits) (Ranks) 


module.exports = Deck 