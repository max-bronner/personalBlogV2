import data20200606 from './plants_2020-06-06.json';
import data20200615 from './plants_2020-06-15.json';

const data = [data20200606, data20200615, data20201109];

export default data.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});
