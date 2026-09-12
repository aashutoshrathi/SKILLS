#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("🚀 Installing Agent Skills by @aashutoshrathi...");

const sourceDir = path.join(__dirname, '..');
const targetClaude = path.join(process.env.HOME, '.claude', 'skills');
const targetGlobal = path.join(process.env.HOME, '.agent-skills');

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            if (element === 'README.md') return; // Skip README
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

try {
    // Install Claude Skills
    const claudeSkillsDir = path.join(sourceDir, 'claude');
    if (fs.existsSync(claudeSkillsDir)) {
        console.log(`Copying Claude skills to ${targetClaude}...`);
        copyFolderSync(claudeSkillsDir, targetClaude);
    }

    // Install Agnostic Skills
    const agnosticSkillsDir = path.join(sourceDir, 'agnostic');
    if (fs.existsSync(agnosticSkillsDir)) {
        console.log(`Copying Agnostic skills to ${targetGlobal}...`);
        copyFolderSync(agnosticSkillsDir, targetGlobal);
    }
    
    console.log("✅ Successfully installed all skills!");
    console.log("Try them out in your AI agent environments.");
} catch (error) {
    console.error("❌ Failed to install skills:", error.message);
}
