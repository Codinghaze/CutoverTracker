export async function LoadTemplates() {
  let templateData = await fetch("http://localhost:5000/CutOver/loadTemplates");
  let templates = await templateData.json();
  return templates;
}
