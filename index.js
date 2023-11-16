import chalk from "chalk";
import inquirer from "inquirer";
let apiLink = "https://v6.exchangerate-api.com/v6/988482f59646fe2ddf854298/latest/PKR";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries,
});
let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `Please Enter The Amount In ${chalk.greenBright.bold(firstCountry.name)}:`,
});
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});
let cnv = `https://v6.exchangerate-api.com/v6/988482f59646fe2ddf854298/pair/${firstCountry.name}/${secondCountry.name}`;
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.rupee * conversionRate;
console.log(`Your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.rupee)} In ${chalk.bold.greenBright(secondCountry.name)} Is ${chalk.bold.greenBright(convertedRate)}`);
