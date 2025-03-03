import data20200606 from './plants_2020-06-06.json';
import data20200607 from './plants_2020-06-07.json';
import data20200608 from './plants_2020-06-08.json';
import data20200609 from './plants_2020-06-09.json';
import data20200610 from './plants_2020-06-10.json';

const data = [
  data20200606,
  data20200607,
  data20200608,
  data20200609,
  data20200610,
];

export default data.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});
