import data20200606 from './plants_2020-06-06.json';

const data = [
  data20200606,
];

export default data.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});
