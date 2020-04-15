const fs = require('fs');

const ratingLevel = {
  'Tệ': 0,
  'Tàm tạm': 1,
  'Tốt': 2,
};

const dirName = 'data';

const ratingMap = {
  1: ratingLevel['Tệ'],
  2: ratingLevel['Tệ'],
  3: ratingLevel['Tàm tạm'],
  4: ratingLevel['Tốt'],
  5: ratingLevel['Tốt'],
};

const totalLength = fs.readdirSync(dirName).length;
const jsonPaths = Array(totalLength - 1).fill(0).map((_, i) => `${i + 1}.json`);

const count = {
  0: 0,
  1: 0,
  2: 0,
};

const max = 600;

const normalize = str => str.replace(/[\r\n.,,?!]+/g, '');

const procced = jsonPaths.map((path) => {
  const data = JSON.parse(fs.readFileSync(`${dirName}/${path}`)).data;
  const filteredData = data.map(v => {
    if (count[ratingMap[v.rating]] < max) {
      count[ratingMap[v.rating]]++
      return [
        ratingMap[v.rating],
        `${normalize(v.title)} ${normalize(v.content.split('\n').join(' '))}`
      ];
    }
    
  });
  return filteredData.filter(Boolean);
}).flat().join('\n');

fs.writeFileSync('train.csv', procced)
console.log(count)