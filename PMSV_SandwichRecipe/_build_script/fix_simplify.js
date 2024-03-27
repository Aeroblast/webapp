const fs = require('fs')

// remove duplicate and combine similar recipes

const recipes_old = JSON.parse(fs.readFileSync('./data_recipe.json', "utf8"));
console.log("Before: " + recipes_old.length);

const recipes = [];

for (let i = 0; i < recipes_old.length; i++) {
    const R1 = recipes_old[i];
    if (R1.used) { continue; }
    if (R1.number) { recipes.push(R1); continue; }
    for (let j = i + 1; j < recipes_old.length; j++) {
        const R2 = recipes_old[j];
        if (R2.used) { continue; }
        if (HasSamePowers(R1, R2)) {
            if (!R1.alter) { R1.alter = []; }
            R1.alter.push(R2);
            R2.used = true;
        }
    }
    if (R1.alter) {
        let key = R1;
        let alters = R1.alter;

        while (alters.length > 0) {
            let temp = [];
            key.alter = [];
            for (let j = 0; j < alters.length; j++) {
                const alter = alters[j];
                const diff = RecipeDiff(key, alter);
                if (diff.ingredients.length == 0) {
                    if (diff.condiments.length == 0) {

                        // exactly same. skip
                        key.alter.push({ type: "same" })
                    } else {
                        // only condif diff
                        if (diff.condiments.length == 2) {
                            if (diff.condiments[0].t != "A" || diff.condiments[1].t != "B") { throw diff; }
                            let obj = { type: "condiments", replace: diff.condiments[0].item, value: diff.condiments[1].item }
                            key.alter.push(obj)
                        } else {

                            temp.push(diff.B);
                        }

                    }
                } else {
                    if (diff.condiments.length == 0) {

                        //only ingred diff
                        if (diff.ingredients.length == 2) {
                            if (diff.ingredients[0].t != "A" || diff.ingredients[1].t != "B") { throw diff; }
                            let obj = { type: "ingredients", replace: diff.ingredients[0].item, value: diff.ingredients[1].item }
                            key.alter.push(obj)
                        } else {
                            temp.push(diff.B);
                        }
                    } else {
                        // two part diff
                        temp.push(diff.B);
                    }
                }
            }
            recipes.push(key)
            key = temp.pop();
            alters = temp;
            temp = [];
        }
        if (key) { recipes.push(key) }


    } else {// no alter

        recipes.push(R1);
    }
}

for (const r of recipes) {
    if (r.used) {
        delete r.used;
    }
    if (r.alter && r.alter.length == 0) {
        delete r.alter;
    }
}
let count = 0;
for (const r of recipes) {

    if (r.alter) {
        count += r.alter.length;
    }
}
console.log(`after: ${recipes.length} + ${count} = ${recipes.length + count}`)
for (const r of recipes) {
    if (r.alter) {
        r.alter = r.alter.filter(x => x.type != "same");
        if (r.alter.length == 0) { delete r.alter; continue; }
        let section = r.alter[0].type;
        let replace = r.alter[0].replace;
        let flag = false;
        for (let i = 1; i < r.alter.length; i++) {
            if (r.alter[i].type != section || r.alter[i].replace != replace) {
                flag = true;
                break;
            }
        }
        if (flag) {
            // 不能随便合并
            continue;
        } else {
            //全都一样或者只有一个
            let index = r[section].indexOf(replace);
            r[section][index] += r.alter.map(x => "/" + x.value).join("");
            delete r.alter;
        }

    }
}


fs.writeFileSync("data_recipe_fix.json", JSON.stringify(recipes, null, 2))



function HasSamePowers(A, B) {
    for (const p1 of A.powers) {
        let flag = false;
        for (const p2 of B.powers) {
            if (p1.lv == p2.lv && p1.name == p2.name && p1.type == p2.type) {
                flag = true;
                break;
            }
        }
        if (!flag) { return false; }
    }
    return true;
}

function RecipeDiff(A, B) {
    return {
        ingredients: ArrayDiff(A.ingredients, B.ingredients)
        , condiments: ArrayDiff(A.condiments, B.condiments)
        , B: B
    }

}


function ArrayDiff(A, B) {
    const r = [];
    let tempB = [...B];
    for (const x1 of A) {
        let flag = false;
        for (let i = 0; i < tempB.length; i++) {
            const x2 = tempB[i];
            if (x1 == x2) {
                flag = true;
                tempB.splice(i, 1);
                break;
            }
        }
        if (!flag) { r.push({ item: x1, t: "A" }); }
    }
    for (const item of tempB) {
        r.push({ item: item, t: "B" });
    }
    return r;
}