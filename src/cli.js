import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs){
    const args = arg({
        '--git': Boolean,
        '--yes': Boolean,
        '--install': Boolean,
        '-g': '--git',
        '-y': '--yes',
        '-i': '--install'
    },
    {
        argv: rawArgs.slice(2)
    })
    return{
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        returnInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options){
    const defaultTemplate = 'JavaScript';
    if(options.skipPrompts){
        return{
            ... options,
            template: options.template || defaultTemplate
        }
    }
    const questions = [];
    if(!options.template){
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: ['JavaScript', 'TypeScript'],
            defualt: defaultTemplate
        })
    }
    if(!options.git){
      questions.push({
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        defualt: false,
    })
    }
}

export function cli(args){
    let options = parseArgumentsIntoOptions(args);
    console.log(options);
}