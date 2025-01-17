# prompt2svg2png

根据 prompt 生成 svg，根据 template.svg 及 data.json 批量生成 png，主要用于个性化奖状生成。

prompt 生成 svg 请参考: [借助 Claude 生成”助人之星“证书SVG](https://zishu-co.feishu.cn/docx/Mi8ddwydnoxsyexS7FMchSbfnWS?from=from_copylink)

## 使用

- Node 环境

```bash
npm i
npm run transform
npm run start
# 可选: Usage: node index.js <file.svg or directory>
node index.js wow-agent-poster.svg
# or
node index.js svg
```

- Python 环境

```bash
pip install -r requirements.txt
python transform_list_to_json.py
python generate_certificates.py
# 可选: Usage: python generate_certificates.py <file.svg or directory>
python generate_certificates.py wow-agent-poster.svg
# or
python generate_certificates.py svg 
```

## 说明

1. 将 list.txt 中的数据转换为 data.json
2. 根据 prompt 生成 svg
3. 根据 template.svg 及 data.json 批量生成 png
