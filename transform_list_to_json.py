import json

def transform_list_to_json():
    # Read list.txt
    with open('list.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Parse each line
    award_members = []
    for line in lines:
        name, description = line.strip().split('，', 1)
        member = {
            "name": name,
            "title": "在\"wow-rag组队学习\"活动中表现优异",
            "description": description
        }
        award_members.append(member)
    
    # Read existing data.json
    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Update award_members
    data['award_members'] = award_members
    
    # Write updated data
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    transform_list_to_json()
