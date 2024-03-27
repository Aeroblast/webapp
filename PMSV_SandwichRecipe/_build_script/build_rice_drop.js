const fs = require('fs')

const data_condiment = JSON.parse(fs.readFileSync('./data_condiment.json', "utf8"));
//JSON.stringify
//JSON.parse
//fs.writeFileSync

const names_type = `
一般/普通	一般	ノーマル/ノ	Normal
飞行	飛行	ひこう/飛	Flying
火	火	ほのお/炎	Fire
超能力/超能	超能力	エスパー/エ	Psychic
水	水	みず/水	Water
虫	蟲	むし/虫	Bug
电	電	でんき/電	Electric
岩石/岩	岩石	いわ/岩	Rock
草	草	くさ/草	Grass
幽灵/鬼	幽靈	ゴースト/ゴ	Ghost
冰	冰	こおり/氷	Ice
龙	龍	ドラゴン/ド	Dragon
格斗	格鬥	かくとう/格	Fighting
毒	毒	どく/毒	Poison
地面	地面	じめん/地	Ground
钢	鋼	はがね/鋼	Steel
恶	惡	あく/悪	Dark
妖精/仙	妖精	フェアリー/フ	Fairy
`.replaceAll('\r', '').trim();
const type_names = names_type.split('\n').map(l => l.split('\t'));
const data_type = type_names.map(l => {
    const chs = l[0].split('/');
    const jpn = l[2].split('/');
    const obj = {
        chs: chs[0],
        cht: l[1],
        jpn: jpn[0],
        jpn_alter: jpn[1],
        eng: l[3]
    }
    if (chs.length > 1) { obj.chs_alter = chs[1]; }
    return obj;
})

const names_power = `
蛋蛋力|タマゴ|Egg|Egg
捕获力|ほかく|Catching|Catching
经验力|けいけんち|Exp. Point|ExpPoint
掉物力|おとしもの|Item Drop|ItemDrop
团战力|レイド|Raid|Raid
称号力|二つ名|Title|Title
闪耀力|かがやき|Sparkling|Sparking
大大力|でかでか|Humungo|Humungo
小小力|ちびちび|Teensy|Teensy
遭遇力|そうぐう|Encounter|Encounter`.trim().split('\n').map(l => l.split('|'));

const RD_types = `
Bug: Butter / Cream Cheese
Dark: Yogurt
Dragon: Pepper and Vinegar
Electric: Jam
Fairy: Yogurt and Vinegar
Fighting: Marmalade
Fire: Peanut Butter and Olive Oil
Flying: Ketchup
Ghost: Olive Oil
Grass: Chili Sauce and Olive Oil
Ground: Mustard
Ice: Pepper
Normal: 
Poison: Ketchup and Marmalade
Psychic: Vinegar
Rock: Mustard and Marmalade
Steel: Peanut Butter
Water: Chili Sauce
`

const RD_raw = `
Bug Type:
Bitter/Spicy + Bitter: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Sour/Spicy: Encounter Power
Sour + Bitter/Spicy: Teensy Power
Sour + Sour/Sweet: Catching Power
Spicy + Spicy/Sweet: Raid Power
Sweet + Bitter/Salty/Sweet: Egg Power
Spicy + Salty/Sour/Spicy + Curry Powder: Humungo Power
 
Dark Type:
Bitter/Spicy  + Bitter: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty/Spicy + Salty: Encounter Power
Salty/Bitter/Spicy + Sour: Teensy Power
Sour/Sweet + Sour/Sweet: Catching Power
Spicy + Spicy/Sweet: Raid Power
Sweet + Bitter/Salty: Egg Power
Spicy + Bitter/Salty/Sour + Wasabi:Humungo Power


Dragon Type:
Bitter/Sweet + Bitter: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty: Encounter Power
Sour + Sour/Bitter/Salty/Spicy: Teensy Power
Spicy + Spicy/Bitter/Salty: Humungo Power
Spicy + Sweet: Raid Power
Sweet + Salty: Egg Power
Sweet + Sour /Sweet: Catching Power

Electric Type:
Bitter + Bitter/Spicy: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Spicy: Encounter Power
Sour + Salty /Bitter/Spicy: Teensy Power
Sour/Sweet + Sour/Sweet: Catching Power
Spicy + Spicy/Sweet: Raid Power
Sweet + Bitter/Salty: Egg Power
Spicy + Spicy+Salt: Humungo Power
Spicy + Sour/Salty +Wasabi: Humungo Power

Fairy Type:
Bitter + Bitter/Spicy : Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Spicy: Encounter Power
Sour + Salty /Bitter/Spicy: Teensy Power
Sour/ Sweet + Sour/ Sweet: Catching Power
Spicy + Spicy: Humungo Power
Spicy + Sweet: Raid Power
Sweet + Bitter/Salty: Egg Power


Fighting Type:
Bitter + Bitter/Sour/Spicy/Sweet: Item Drop Power
Salty + Salty/Bitter: Exp. Point Power
Sour + Sour/Spicy/Salty : Teensy Power
Sour + Sweet: Catching Power
Spicy + Salty: Encounter Power
Spicy + Spicy: Humungo Power
Spicy + Sweet: Raid Power
Sweet + Sweet/Salty: Egg Power


Fire Type:
Bitter + Bitter/Spicy : Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Sour/Spicy : Encounter Power
Sour + Spicy /Bitter: Teensy Power
Sour + Sour/Sweet: Catching Power
Spicy + Spicy/Sweet: Raid Power
Sweet + Sweet/Salty/Bitter: Egg Power

Flying Type:
Bitter + Bitter/Salty: Exp. Point Power
Salty + Salty/Sour/Spicy/Sweet : Encounter Power
Sour + Sour/Bitter/Spicy: Teensy Power
Sour + Sweet: Catching Power
Spicy + Bitter: Item Drop Power
Spicy + Spicy: Humungo Power
Spicy + Sweet: Raid Power
Sweet +  Sweet/Bitter: Egg Power


Ghost Type:
Bitter + Bitter/Spicy/Sweet: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Spicy: Encounter Power
Sour + Sour/Spicy/Bitter/Salty: Teensy Power
Spicy + Spicy: Humungo Power
Spicy + Sweet: Raid Power
Sweet + Salty: Egg Power
Sweet + Sweet/Sour : Catching Power

Grass Type:
Bitter + Bitter: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Sour/Sweet : Encounter Power
Sour + Sour/Bitter: Teensy Power
Sour + Sweet: Catching Power
Spicy + Spicy/Sour/Salty/Bitter: Humungo Power
Sweet + Bitter: Egg Power
Sweet + Sweet/Spicy : Raid Power

Ground Type:
Bitter + Bitter/Sweet: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Sour/Sweet: Encounter Power
Sour + Sour/Bitter: Teensy Power
Sour + Sweet: Catching Power
Spicy + Spicy/Sour/Salty/Bitter: Humungo Power
Sweet + Sweet/Spicy : Raid Power
Sweet + Bitter/Salty/Sweet + Peanut Butter: Egg Power

Ice Type:
Bitter + Bitter/Sour/Sweet: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Sweet/Sour: Encounter Power
Sour + Sour: Teensy Power
Sour + Sweet: Catching Power
Spicy + Spicy/Sour/Salty/Bitter: Humungo Power
Sweet + Sweet/Spicy: Raid Power
Sweet + Bitter/Salty + Jam/Yogurt:Egg Power

Normal Type:
Bitter + Bitter/Spicy : Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Spicy/Sour: Encounter Power
Sour + Bitter/Spicy : Teensy Power
Sour + Sour/Sweet: Catching Power
Spicy + Spicy/Sweet: Raid Power
Sweet + Sweet/Salty/Bitter: Egg Power
Spicy + Bitter/Salty/Sour +Horseradish:Humungo Power 


Poison Type:
Bitter + Bitter/Spicy: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Spicy: Encounter Power
Sour + Bitter/Salty/Spicy: Teensy Power
Sour/Sweet + Sour/Sweet: Catching Power
Spicy + Spicy: Humungo Power
Spicy + Sweet: Raid Power
Sweet + Bitter/Salty: Egg Power



Psychic Type:
Bitter + Bitter/Spicy: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Spicy: Encounter Power
Sour + Bitter/Salty/Spicy : Teensy Power
Sour/Sweet + Sour/Sweet: Catching Power
Spicy + Spicy: Humungo Power
Spicy + Sweet: Raid Power
Sweet + Bitter/Salty: Egg Power


Rock Type:
Bitter + Bitter/Sour/Spicy /Sweet: Item Drop Power
Salty + Salty/Bitter: Exp. Point Power
Sour + Sour/Salty/Spicy: Teensy Power
Sour + Sweet: Catching Power
Spicy + Spicy/Salty: Humungo Power
Spicy + Sweet: Raid Power
Sweet + Sweet/Salty: Egg Power


Steel Type:
Bitter + Bitter/Spicy : Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Spicy/Sour: Encounter Power
Sour + Bitter/Spicy : Teensy Power
Sour + Sour/ Sweet: Catching Power
Spicy + Spicy/Sweet: Raid Power
Sweet + Sweet/Salty/Bitter: Egg Power
Spicy + Bitter/Sour + Chili Sauce/Curry Powder/Pepper/Wasabi: Humungo Power
Spicy + Salty + Curry Powder / Wasabi:Humungo Power

Water Type:
Bitter + Bitter: Item Drop Power
Salty + Bitter: Exp. Point Power
Salty + Salty/Sour/Sweet: Encounter Power
Sour + Sour/Bitter: Teensy Power
Sour + Sweet: Catching Power
Spicy + Spicy/Sour/Salty/Bitter: Humungo Power
Sweet + Bitter: Egg Power
Sweet + Sweet/Spicy: Raid Power
`;


const shorten = {
    Sweet: "秘传：甜味料",
    Bitter: "秘传：苦味料",
    Salty: "秘传：咸味料",
    Sour: "秘传：酸味料",
    Spicy: "秘传：辣味料"
}
// rock:To get Encounter Power use Bacon instead of Rice and place one piece on the sandwich along with:
//Salty + Sour/Spicy/Sweet


const type_defining_items = RD_types.trim().split("\n")
    .map(line => {
        const t = line.split(":")
        const type = t[0];
        const type_chs = data_type.find(x => x.eng == type).chs;
        const items = t[1].split("and").map(item => {
            const srcs = item.split('/').map(x => x.trim())
            const srcs_chs = srcs.map(src => {
                if (!src) return "";
                let obj = data_condiment.find(x => x.name_eng == src);
                if (!obj) { throw "Cannot find condiment: " + item; }
                return obj.name
            });
            return srcs_chs.join('/');
        });
        if (items[0] == "") items.pop();
        return {
            type: type_chs,
            items: items
        }
    })
const dic_type = {};
for (const r of type_defining_items) {
    dic_type[r.type] = r.items;
}
console.log(type_defining_items)
let current;
let recipes = [];
for (const line of RD_raw.split('\n')) {
    if (line.trim() == "") continue;
    const match = line.match(/([A-Z][a-z]+) Type:/);
    if (match) {
        current = data_type.find(x => x.eng == match[1]).chs;
        if (!current) { throw "match failed: " + line; }
        continue;
    }
    const t = line.split(":");
    if (t.length < 2) {
        throw line;
    }
    const power = names_power.find(l => t[1].trim().startsWith(l[2]))[0];
    const items_raw = t[0].split('+');
    const items = items_raw.map(item => {
        const srcs = item.split('/').map(x => x.trim())
        const srcs_chs = srcs.map(src => {
            if (!src) return "";
            if (shorten[src]) {
                return shorten[src]
            }
            let obj = data_condiment.find(x => x.name_eng == src);
            if (!obj) { throw "Cannot find condiment: " + item; }
            return obj.name
        });
        return srcs_chs.join('/');
    });
    recipes.push({
        "name_jpn": "ライスは捨てて",
        "name": "扔掉米饭",
        "name_eng": "Rice Drop Method",
        ingredients: [
            "米饭",
        ],
        condiments: [...dic_type[current], ...items],
        "powers": [
            {
                "lv": "Lv3",
                "name": "闪耀力",
                "type": current
            },
            {
                "lv": "L3",
                "name": "称号力",
                "type": current
            },
            {
                "lv": "Lv3",
                "name": power,
                "type": current
            }
        ]
    });


}
console.log(recipes)

//
//JSON.parse
fs.writeFileSync("data_recipe_RiceDrop.json", JSON.stringify(recipes, null, 2))