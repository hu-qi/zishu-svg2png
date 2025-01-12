import json
from pathlib import Path
import cairosvg

# 读取数据文件
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    members = data['award_members']
    github_repo_name = data['github_repo_name']

# 读取模板文件
with open('template.svg', 'r', encoding='utf-8') as f:
    template = f.read()

# 创建输出目录
output_dir = Path(github_repo_name)
output_dir.mkdir(exist_ok=True)

# 生成证书
for i, member in enumerate(members, start=1):
    # 替换模板内容
    cert_content = template
    cert_content = cert_content.replace('{{name}}', member['name'])
    cert_content = cert_content.replace('{{description}}', member['description'])
    cert_content = cert_content.replace('{{title}}', member['title'])
    cert_content = cert_content.replace('{{cert_id}}', f'{i:04d}')
    cert_content = cert_content.replace('{{award_name}}', data['award_name'])
    cert_content = cert_content.replace('{{from}}', data['from'])
    cert_content = cert_content.replace('{{github_url}}', data['github_url'])
    cert_content = cert_content.replace('{{team_name}}', data['team_name'])


    # 保存证书文件
    output_path = output_dir / f'{member["name"]}.svg'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(cert_content)
    
    # 新增：将 SVG 转换为 PNG
    png_path = output_dir / f'{member["name"]}.png'
    cairosvg.svg2png(url=str(output_path), write_to=str(png_path))
