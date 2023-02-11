const jsonStr = `
{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }
`;

const data = JSON.parse(jsonStr, function (key, value) {
  if (key == "age") return +value;
  else return value;
});

console.log("result", data);