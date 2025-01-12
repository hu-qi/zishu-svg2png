const fs = require('fs');

function transformListToJson() {
    // Read list.txt
    const listData = fs.readFileSync('list.txt', 'utf8');
    
    // Parse each line
    const awardMembers = listData.split('\n').map(line => {
        const [name, description] = line.split('，');
        return {
            name: name.trim(),
            title: '在"wow-rag组队学习"活动中表现优异',
            description: description.trim()
        };
    }).filter(member => member.name); // Remove empty lines
    
    // Read existing data.json
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    
    // Update award_members
    data.award_members = awardMembers;
    
    // Write updated data
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4), 'utf8');
}

// Run if executed directly
if (require.main === module) {
    transformListToJson();
}
