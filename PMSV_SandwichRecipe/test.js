const fs = require("fs");

const loadRaw = (file) => fs.readFileSync(file, "utf8").replaceAll('\r', '').trim();
let raw = loadRaw("type_names.txt");
const type_names = raw.split('\n').map(l => l.split('\t'));

const type_data = type_names.map(l => {
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


raw = loadRaw("names_recipe.txt");
const names_recipe = raw.split('\n').map(l => l.split('\t').map(x => x.trim()));

const names_power = `
蛋蛋力 タマゴ
捕获力 ほかく
经验力 けいけんち
掉物力 おとしもの
团战力 レイド
称号力 二つ名
闪耀力 かがやき
大大力 でかでか
小小力 ちびちび
遭遇力 そうぐう`.trim().split('\n').map(l => l.split(' '));

const recipe_jpn = JSON.parse(fs.readFileSync("data_recipe_jpn.json", "utf8"));
const data_ingredient = JSON.parse(fs.readFileSync("data_ingredient.json", "utf8"));
const data_condiment = JSON.parse(fs.readFileSync("data_condiment.json", "utf8"));


let r = [];

for (const recipe of recipe_jpn) {
    let o = {};
    if (recipe.name == "No.???オリジナルサンド") {

    } else {
        let ms = recipe.name.match(/(No.[0-9?]+)(.+)/);
        o.number = ms[1];
        o.name_jpn = ms[2];

        let n = names_recipe.find(x => x[1] == o.name_jpn);
        o.name = n[0];
        o.name_eng = n[2];
    }
    let ingredients = [], condiments = [];

    for (const n of recipe.items) {
        let item = data_condiment.find(x => x.name_jpn == n);
        if (item) {
            condiments.push(item.name);
            continue;
        }
        item = data_ingredient.find(x => x.name_jpn == n);
        if (item) {
            ingredients.push(item.name);
            continue;
        }
        throw "Cannot find" + n;
    }
    o.ingredients = ingredients;
    o.condiments = condiments;
    let powers = [];

    for (const n of recipe.powers) {
        console.log(n)
        let p = { lv: n.lv };
        let name = names_power.find(x => x[1] == n.power);
        p.name = name[0];
        if (n.type) {
            p.type = type_data.find(x => x.jpn == n.type).chs;
        }
        powers.push(p)

    }
    o.powers = powers;
    r.push(o)
}
console.log(r)
fs.writeFileSync("data_recipe.json",JSON.stringify(r,null,2));
