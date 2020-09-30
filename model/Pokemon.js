const mongoose = require('mongoose');
const pokemonSchema = new mongoose.Schema(
    {
        id:{
            type: String            
        },
        user:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'

        }],       
        
        date: {
            type: Date,
            default:Date.now
        }

    }
)

module.exports = mongoose.model('Pokemon',pokemonSchema);
