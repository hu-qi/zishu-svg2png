const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// 读取数据文件
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const members = data.award_members;
const generate_path = data.github_repo_name;

// 读取模板文件
const template = fs.readFileSync('template.svg', 'utf8');

// 创建输出目录
const outputDir = path.join(__dirname, generate_path);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 生成证书
async function generateCertificates() {
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    
    // 替换模板内容
    let certContent = template
      .replace('{{name}}', member.name)
      .replace('{{description}}', member.description)
      .replace('{{title}}', member.title)
      .replace('{{cert_id}}', String(i + 1).padStart(4, '0'))
      .replace('{{award_name}}', data.award_name)
      .replace('{{from}}', data.from)
      .replace('{{github_url}}', data.github_url)
      .replace('{{team_name}}', data.team_name);
    
    // 保存证书文件
    const outputPath = path.join(outputDir, `${member.name}.svg`);
    fs.writeFileSync(outputPath, certContent);
    
    // 使用 resvg 转换为PNG
    const pngPath = path.join(outputDir, `${member.name}.png`);
    const resvg = new Resvg(certContent, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });
    const pngData = resvg.render();
    fs.writeFileSync(pngPath, pngData.asPng());
  }
}

generateCertificates()
  .then(() => console.log('Certificates generated successfully!'))
  .catch(err => console.error('Error generating certificates:', err));
