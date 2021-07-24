module.exports = {getPersonne, getMatch, allMatchs, getMatchDetaille, getResultats, addVote, save, update, getResultatsOngoing}
const fs = require('fs');

let personnes=[];

let openings=[
    {id:0, name:'GTO', ytcode:'2JGl6UzfPkE', points:0},
    {id:1, name:'Evangelion', ytcode:'nU21rCWkuJw', points:0},
    {id:2, name:'LO', ytcode:'nU21rCWkuJw', points:0},
    {id:3, name:'MDR', ytcode:'nU21rCWkuJw', points:0}
];

let matchs=[
    {idmatch:0, id1:0, id2:1, votes1: [], votes2: []},
    {idmatch:1, id1:1, id2:0, votes1: [], votes2: []},
]

function save() {
    let data1 = JSON.stringify(personnes);
    fs.writeFileSync('personnes.json', data1);

    let data2 = JSON.stringify(openings);
    fs.writeFileSync('openings.json', data2);

    let data3 = JSON.stringify(matchs);
    fs.writeFileSync('matchs.json', data3);

    return 'OK'
}

function update() {
    fs.readFile('personnes.json', (err, data) => {
        if (err) throw err;
        personnes = JSON.parse(data);
        console.log(personnes);
    });

    fs.readFile('openings.json', (err, data) => {
        if (err) throw err;
        openings = JSON.parse(data);
        console.log(openings);
    });

    fs.readFile('matchs.json', (err, data) => {
        if (err) throw err;
        matchs = JSON.parse(data);
        console.log(matchs);
    });
}

function addVote(idmatch, idop, code) {
    let match = matchs.find(p => p.idmatch == idmatch);
    if (!match){
        return 301
    }
    if(match.id1 == idop){
        match.votes1.push(personnes.find(p => p.code == code).id)
        console.log(matchs)
        return 200
    } else if (match.id2 == idop){
        match.votes2.push(personnes.find(p => p.code == code).id)
        console.log(matchs)
        return 200
    } else{
        console.log(matchs)
        return 300
    }
}

function allMatchs() {
    let res = []
    matchs.forEach(match => {
        let op1 = openings.find(p => p.id== match.id1);
        let op2 = openings.find(p => p.id== match.id2);

        res.push({idmatch:match.idmatch, op1:op1.name, op2:op2.name, id1:match.id, id2:match.id })
    });

    return res;
}

function getResultats() {
    let res = []

    openings.forEach(op =>{
        res.push({id:op.id, name:op.name, points:op.points})
    });

    return res.sort((a, b) => b.points - a.points);
    
}

function getResultatsOngoing() {
    let res = []

    matchs.forEach(match =>{
        res.push({id:match.idmatch, numberVotes:match.votes1.length+match.votes2.length})
    });

    
    return res.sort((a, b) => b.numberVotes - a.numberVotes);
    
}

function getMatchDetaille(idmatch) {
    let match = matchs.find(p => p.idmatch == idmatch);
    
    let openings1 = openings.find(p => p.id === match.id1 );
    let openings2 = openings.find(p => p.id === match.id2 );

    return {idmatch: match.idmatch, op1:openings1, op2:openings2};
    
}

function getMatch(idmatch) {
    let match = matchs.find(p => p.idmatch == idmatch);
    
    let openings12 = openings.filter(p => p.id === match.id1 || p.id === match.id2 );

    return openings12;
    
}

function getPersonne(code) {
    return personnes.find(p => p.code === code);
}