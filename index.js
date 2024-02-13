const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

async function getMangerDetails() {
    return await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter manager name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter manager id:',
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter manager email:',
          },
          {
            type: 'input',
            name: 'office',
            message: 'Enter manager office number:',
          },
      ]);
}

async function getEngineerDetails() {
    return await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter engineer name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter engineer id:',
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter engineer email:',
          },
          {
            type: 'input',
            name: 'github',
            message: 'Enter engineer github:',
          },
      ]);
}

async function getInternDetails() {
    return await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter intern name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter intern id:',
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter intern email:',
          },
          {
            type: 'input',
            name: 'school',
            message: 'Enter intern school:',
          },
      ]);
}

async function getChoice() {
    return await inquirer.prompt([
        {
          type: 'list',
          name: 'option',
          message: 'Choose an option:',
          choices: ['Add engineer', 'Add intern', 'Generate team page'],
        },
      ]);
}

// TODO: Write Code to gather information about the development team members, and render the HTML file.
async function main() {
    let employees = []
    var { name, id, email, office } = await getMangerDetails();
    const manager = new Manager(name, id, email, office)
    employees.push(manager)

    let choice = await getChoice()

    while (choice.option != 'Generate team page') {
        switch (choice.option) {
            case 'Add engineer':
              var { name, id, email, github } = await getEngineerDetails();
              const engineer = new Engineer(name, id, email, github)
              employees.push(engineer)
              console.log(`You have successfully added engineer ${name}`);
              break;
            case 'Add intern':
                var { name, id, email, school } = await getInternDetails();
                const intern = new Intern(name, id, email, school)
                employees.push(intern)
                console.log(`You have successfully added intern ${name}`);
              break; 
            }
        choice = await getChoice()
    }
      console.log("generating " + employees.length )

      const generatedHtml = render(employees)
      console.log(generatedHtml)

      const directoryName = "output"
      if (!fs.existsSync(directoryName)) {
        // If not, create the directory
        fs.mkdirSync(directoryName);
        console.log(`Directory "${directoryName}" created successfully.`);
      } else {
        console.log(`Directory "${directoryName}" already exists.`);
      }
      
      fs.writeFile("./output/team.html", generatedHtml, err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      })
}

main();