const parser = new DOMParser();

const xmlStr = `
<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlStr, "text/xml");

const listNode = xmlDOM.querySelector("list");
const list = [];
const studentsNodes = [...listNode.querySelectorAll("student")];
studentsNodes.forEach( studentNode =>
{
const nameNode = studentNode.querySelector("name");
const firstNode = nameNode.querySelector("first");
const secondNode = nameNode.querySelector("second");
const ageNode = studentNode.querySelector("age");
const profNode = studentNode.querySelector("prof");

const langAttr = nameNode.getAttribute("lang");
list.push({
    Name: `${firstNode.textContent} ${secondNode.textContent}`,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr,
})})

const result = {
  list: list,
};

console.log("result", result);
