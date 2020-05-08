const expenseReport = (str) => {
    const splitted = str.split("\n");//split incoming string per line
    const balance = Number(splitted.shift());//extract balance from the first line. initial array is already reduced by 1

    const items ={};// items object store each item in this {1: ["Cocoa", "50"],2:["Yam", "22"]}
    splitted.forEach((item, index) => {
    	//the regular expression at index 0 extracts name of item. regex at index 1 extracts the expense made on each item
        items[index + 1] =[ item.match(/\s(.*?)\s|[a-zA-Z](.*?)\s/g).map(x=>x.trim()).join("_"), item.match(/(\d[\d.]*)/g) ] ;
    });
    let final_string ="Original_Balance:_" + balance.toFixed(2)  ;
    let new_balance = balance

    //this part of the code does the calculation and concatenation of other strings to be added
    for(let i= 1; i<= splitted.length; i++){
        new_balance -= Number(items[i][1][1]);
        final_string += "\n";
        final_string += `${i}_${items[i][0]}_${items[i][1][1]}_Balance_${new_balance.toFixed(2)}`
    }
    final_string += `\n${splitted.length + 1}_Neighbor_50.00_Balance_${(new_balance -= 50).toFixed(2)}`
    const total_exp =balance - new_balance
    final_string +=`\nTotal_expense__${total_exp.toFixed(2)}\nAverage_expense__${(total_exp/(splitted.length+1)).toFixed(2)}`

    return final_string;

};

console.log(expenseReport("1000.00\n1 Market 125.45\n2 Hardware 34.95\n3 Video 7.45\n4 Book 14.32\n5 Gasoline 16.10"));
console.log("\n");
console.log(expenseReport("4000.00\n1 Yam Flour 125.45\n2 Oranges 34.95\n3 Cutleries 7.45\n4 Phone Pouch 14.32\n5 Bucket Handle 16.10\n6 Phone Charger 123.45\n7 Three Slice Bread 22.45\n8 Nine Light Bulbs 16.12"));