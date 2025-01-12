const fs = require('fs');
const path = require('path');

function parseList(content) {
  const lines = content.split('\n');
  const result = {
    project_name: '',
    award_name: '',
    from: '',
    team_name: '',
    github_repo_name: '',
    github_url: '',
    reason: '',
    award_members: []
  };

  lines.forEach(line => {
    if (line.startsWith('# project_name:')) {
      result.project_name = line.split(':')[1].trim();
    } else if (line.startsWith('# award_name:')) {
      result.award_name = line.split(':')[1].trim();
    } else if (line.startsWith('# from:')) {
      result.from = line.split(':')[1].trim();
    } else if (line.startsWith('# team_name:')) {
      result.team_name = line.split(':')[1].trim();
    } else if (line.startsWith('# github_repo_name:')) {
      result.github_repo_name = line.split(':')[1].trim();
    } else if (line.startsWith('# github_url:')) {
      result.github_url = line.split('# github_url:')[1].trim();
    } else if (line.startsWith('# reason:')) {
      result.reason = line.split(':')[1].trim().replace(/\\"/g, '');
    } else if (line.trim() && !line.startsWith('#')) {
      const firstCommaIndex = line.indexOf('，');
      const name = line.slice(0, firstCommaIndex).trim();
      const description = line.slice(firstCommaIndex + 1).trim();
      result.award_members.push({
        name: name.trim(),
        description: description.trim()
      });
    }
  });

  return result;
}

function main() {
  const listPath = path.join(__dirname, 'list.txt');
  const content = fs.readFileSync(listPath, 'utf8');
  const data = parseList(content);
  
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  console.log('Successfully generated data.json');
}

main();
