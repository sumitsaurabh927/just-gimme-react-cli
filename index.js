#!/usr/bin/env node

import { execSync } from 'child_process';
import { Command } from 'commander';
import degit from 'degit';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
    .version('1.0.0')
    .description('CLI to create a React project from a template')
    .argument('<project-name>', 'Name of the React project')
    .action(async (projectName) => {
        const repo = 'https://github.com/sumitsaurabh927/just-gimme-react-template';
        const emitter = degit(repo, { cache: false, force: true });

        console.log(`Creating a new React project in ${projectName}...`);

        try {
            await emitter.clone(projectName);

            const projectPath = path.join(process.cwd(), projectName);

            if (!fs.existsSync(path.join(projectPath, 'package.json'))) {
                console.error('Error: package.json not found in the cloned repository.');
                process.exit(1);
            }

            console.log('Installing dependencies...');
            execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });

            console.log('Project created successfully!');
            console.log(`\nMagic underway...`);
            execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });
            console.log(`\nTo get started, cd into the "${projectName}" directory and execute \`npm run dev\` to get started!`);
        } catch (error) {
            console.error('An error occurred:', error.message);
            process.exit(1);
        }
    });

program.parse(process.argv);
