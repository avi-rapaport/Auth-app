import fs from 'fs/promises';

const path = './users.json';

export async function readJson() {
  const data = await fs.readFile(path, 'utf-8');
  if (!data) return [];
  return JSON.parse(data);
}

export async function saveJson(content) {
  const data = JSON.stringify(content, null, 2);
  await fs.writeFile(path, data);
}
