import json
import os

def parse_list(content):
    lines = content.split('\n')
    result = {
        'project_name': '',
        'award_name': '',
        'from': '',
        'team_name': '',
        'github_repo_name': '',
        'github_url': '',
        'reason': '',
        'award_members': []
    }

    for line in lines:
        if line.startswith('# project_name:'):
            result['project_name'] = line.split(':')[1].strip()
        elif line.startswith('# award_name:'):
            result['award_name'] = line.split(':')[1].strip()
        elif line.startswith('# from:'):
            result['from'] = line.split(':')[1].strip()
        elif line.startswith('# team_name:'):
            result['team_name'] = line.split(':')[1].strip()
        elif line.startswith('# github_repo_name:'):
            result['github_repo_name'] = line.split(':')[1].strip()
        elif line.startswith('# github_url:'):
            result['github_url'] = line.split('# github_url:')[1].strip()
        elif line.startswith('# reason:'):
            result['reason'] = line.split(':')[1].strip().replace('\\"', '')
        elif line.strip() and not line.startswith('#'):
            name, description = line.strip().split('，', 1)
            member = {
                "name": name.strip(),
                "description": description.strip()
            }
            result['award_members'].append(member)

    return result

def main():
    with open('list.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    data = parse_list(content)
    
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print('Successfully generated data.json')

if __name__ == '__main__':
    main()
