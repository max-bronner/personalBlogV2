import data20200606 from './plants_2020-06-06.json';
import data20200615 from './plants_2020-06-15.json';
import data20201109 from './plants_2020-09-09.json';
import data20221104 from './dev_2022-11-04.json';
import data20230615 from './dev_2023-06-15.json';

const data = [
  data20200606,
  data20200615,
  data20201109,
  data20221104,
  data20230615,
];

export default data.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});
