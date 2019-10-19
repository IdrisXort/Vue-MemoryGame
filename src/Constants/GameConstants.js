const Games =[
    {
        name:"Memory",
        id:"Memory",
        text:"Memory"
    },
    {
        name:"Language",
        id:"Language",
        text:"Language"
    }
]
const Dictionary =[
    {
        EN :"house",
        TR :"ev",
        NL :"huis"        
    },
    {
        EN :"door",
        TR :"kapi",
        NL :"deur"        
    },
    {
        EN :"building",
        TR :"bina",
        NL :"gebouw"        
    },
    {
        EN :"song",
        TR :"sarki",
        NL :"liedje"        
    },
    {
        EN :"short",
        TR :"kisa",
        NL :"kort"        
    }
    // ,

    // {

    //     English:[
    //         ['house','ev'],
    //         ['door', 'kapi'],
    //         ['water','su']
    //     ]
    // }
]
function getLanguage(lang){
    return Dictionary[lang]
}
const Languages =[
    {
        language:"Turkish",
        code:"TR"
    },
    {
        language:"Dutch",
        code:"NL"
    },
    {
        language:"English",
        code:"EN"
    }
]
export {
    Games,
    Dictionary,
    Languages
}