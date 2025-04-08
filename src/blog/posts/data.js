import data20200606 from './plants_2020-06-06.json';
import data20200615 from './plants_2020-06-15.json';
import data20200625 from './general_2020-06-25.json';
import data20200712 from './general_2020-07-12.json';
import data20200909 from './plants_2020-09-09.json';
import data20200924 from './general_2020-09-24.json';
import data20201204 from './general_2020-12-04.json';
import data20210104 from './general_2021-01-04.json';
import data20210114 from './general_2021-01-14.json';
import data20210116 from './general_2021-01-16.json';
import data20210221 from './general_2021-02-21.json';
import data20210305 from './general_2021-03-05.json';
import data20210501 from './general_2021-05-01.json';
import data20210517 from './general_2021-05-17.json';
import data20210710 from './general_2021-07-10.json';
import data20210810 from './general_2021-08-10.json';
import data20210813 from './general_2021-08-13.json';
import data20211028 from './dev_2021-10-28.json';
import data20211109 from './general_2021-11-09.json';
import data20211221 from './general_2021-12-21.json';
import data20221104 from './dev_2022-11-04.json';
import data20230615 from './dev_2023-06-15.json';
import data20250218 from './general_2025-02-18.json';
import data20250326 from './dev_2025-03-26.json';

const data = [
  data20200606,
  data20200615,
  data20200625,
  data20200712,
  data20200909,
  data20200924,
  data20201204,
  data20210104,
  data20210114,
  data20210116,
  data20210221,
  data20210305,
  data20210501,
  data20210517,
  data20210710,
  data20210810,
  data20210813,
  data20211028,
  data20211109,
  data20211221,
  data20221104,
  data20230615,
  data20250218,
  data20250326,
];

export default data.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});
