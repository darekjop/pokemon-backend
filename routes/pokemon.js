const router = require('express').Router();
const verify = require('./token');
const Pokemon = require('../model/Pokemon');
const {fetchPokemon} = require('../model/Pokedex');
const User = require('../model/User');

const LIMIT =5;
/**
 *  all API calls required in header: 
 *  Authorization Token 
 */

/**
 *  API  
 *  GET api/pokemon
 *  get user pokemon
 */
router.get('/',verify,async (req,res)=>{    
    const user = await checkUser(req.user);
    const pok = await fetchPokemon();    
    const pokemon = await Pokemon.find({
        user: user                
    })
    
    let mypokemon=[]; 
    
    if(pokemon && pok && user){
      pokemon.map((pokemon, i) =>{ 
        let foundPokemon = findArrayElementById(pok,pokemon.id);
        if(foundPokemon){
            foundPokemon['name'] = foundPokemon.name[user.language];                           
            mypokemon.push(foundPokemon) ;     
        }
    })
    }    
    res.send(mypokemon);       
})
/**
 *  API  
 *  GET api/pokedex
 *  get catalog pokemon from  
 *  https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json
 *  additional check if pokemons belongs to user login  and display to user lang 
 * 
 */
router.get('/pokedex',verify,async (req,res)=>{            
    const user = await checkUser(req.user);
    const pokemonCalatog = await fetchPokemon();                    
    const pokemonUser = await Pokemon.find({
        user: user                
    })    
    try{
        if(user && pokemonCalatog && pokemonUser){
            
            pokemonCalatog.map((pokemonCalatog, i) =>{   
                pokemonCalatog['name'] = pokemonCalatog.name[user.language];                   
                pokemonCalatog['isUser'] = (findArrayElementById(pokemonUser,pokemonCalatog.id)) ? true : false;                                                    
        })
        }
    }catch(err){
        res.status(400).send(err);
    }
    res.send(pokemonCalatog);    
})
/**
 *  API  
 *  DELETE api/delete/:id
 *  delete user pokemon
 */
router.delete('/delete/:id',verify, async (req,res)=>{    
    const user = await checkUser(req.user);    
    try{
        const removePokemon = await Pokemon.deleteOne({
            user: user,        
            id: req.params["id"]
        })

        res.send(removePokemon);
    }catch(err){
        res.status(400).send(err);
    }
})
/**
 *  API  
 *  POST api/add/:id
 *  add pokemon to user
 */
router.post('/add/:id',verify, async (req,res)=>{     
    const user = await checkUser(req.user);
    const count = await checkLimitPokemon(user);    
    
    if(count < LIMIT){
        const pokemon = new Pokemon({
            user: user,        
            id: req.params["id"]
        })    
        try{
            const savedUser = await pokemon.save();
            res.send(savedUser);
        }catch(err){
            res.status(400).send(err);
        }
    }else{
    
        res.status(200).send({"error":"sorry you can add maximum " +LIMIT +" Pokemons"});;
    }    
        
})
/**
 *  API  
 *  POST api/add/:id
 *  add pokemon to user
 */
async function checkUser(usr){    
        const user = await User.findOne({_id:usr});      
        if(!user) return res.status(401).send("User not login");
    
    return user;
 }

 async function checkLimitPokemon(user){     
    const count= await Pokemon.countDocuments({user:user});         
    return count;
    

 }
 function findArrayElementById(array, id) {
    return array.find((pok) => {            
      return pok.id == id;
    })
  }

module.exports = router