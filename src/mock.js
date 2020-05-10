export const mock = [
  {
    modulesTable: [
      { name: 'Контроль по 2 модулю', isActive: false, startDate: '28.11.2019 10:00', endDate: '28.11.2019 13:30', tries: '0/3' },
      { name: 'Контроль по 3 модулю', isActive: false, startDate: '27.12.2019 11:20', endDate: '27.12.2019 16:50', tries: '0/2' },
      { name: 'Контроль по 4 модулю', isActive: false, startDate: '27.12.2019 11:30', endDate: '27.12.2019 16:50', tries: '0/2' },
      { name: 'Самоконтроль (...)', isActive: true, startDate: '29.02.2020 11:00', endDate: '30.06.2025 11:00', tries: '0/Без обмежень' },
      { name: 'Контроль по 1 модулю', isActive: false, startDate: '05.05.2020 08:00', endDate: '05.05.2020 10:50', tries: '2/3' },
      { name: 'Вхідне тестування', isActive: true, startDate: '--', endDate: '--', tries: '0/1' },
    ],
    doneModulesTable: [
      { name: 'Контроль по 1 модулю', startDate: '05.05.2020 10:26', time: '19 хв. 38 с', inactivePercent: '0', mark: '11.59/20' },
      { name: 'Контроль по 1 модулю', startDate: '28.04.2020 10:37', time: '18 хв. 45 с', inactivePercent: '0', mark: '10.5/20' },
    ],
    courseId: '1327',
    name: 'Бази даних',
    lecturer: 'Михалик Дмитро Михайлович',
  },
  {
    modulesTable: [
      { name: 'Іспит', isActive: false, startDate: '02.06.2016 11:00', endDate: '19.06.2016 11:00', tries: '0/1' },
      { name: 'Залік (1 курс)', isActive: false, startDate: '03.06.2016 12:00', endDate: '24.06.2016 12:00', tries: '0/2' },
      { name: 'Залік (СПзс-31)', isActive: false, startDate: '07.06.2016 13:00', endDate: '08.06.2016 16:00', tries: '0/1' },
      { name: 'Модуль 2 (СП-21, СП-22)', isActive: false, startDate: '25.04.2018 13:00', endDate: '18.11.2019 14:00', tries: '0/3' },
      { name: 'Контроль самопідготовки', isActive: true, startDate: '20.02.2020 14:00', endDate: '01.06.2020 14:00', tries: '0/Без обмежень' },
      { name: 'Модуль 1 (СП-21, СПс-22)', isActive: false, startDate: '13.04.2020 13:00', endDate: '23.04.2020 13:30', tries: '1/1' },
    ],
    doneModulesTable: [{ name: 'Модуль 1 (СП-21, СПс-22)', startDate: '21.04.2020 13:13', time: '10 хв. 0 с', inactivePercent: '0', mark: '8/15' }],
    courseId: '1353',
    name: 'Економіка програмного забезпечення',
    lecturer: 'Цуприк Галина Богданівна',
  },
  {
    modulesTable: [
      { name: 'Модуль 1 пробний', isActive: false, startDate: '27.10.2014 12:00', endDate: '14.12.2014 14:00', tries: '0/2' },
      { name: 'Модуль 2 пробний', isActive: false, startDate: '01.12.2014 12:00', endDate: '14.12.2014 14:00', tries: '0/2' },
      { name: 'Модуль 1', isActive: false, startDate: '19.12.2014 12:00', endDate: '10.06.2015 14:00', tries: '0/2' },
      { name: 'Модуль 2', isActive: false, startDate: '19.12.2014 12:00', endDate: '10.06.2015 14:00', tries: '0/2' },
      { name: 'Підсумковий', isActive: false, startDate: '25.12.2014 15:05', endDate: '25.12.2014 15:45', tries: '0/1' },
      { name: 'Ректорський контроль', isActive: false, startDate: '03.12.2015 09:30', endDate: '03.12.2015 10:50', tries: '0/1' },
    ],
    doneModulesTable: [false],
    courseId: '2062',
    name: 'Людино-машинна взаємодія',
    lecturer: 'Пастух Олег Анатолійович',
  },
  {
    modulesTable: [
      { name: 'ПМК№2', isActive: false, startDate: '28.06.2017 09:00', endDate: '07.05.2018 16:00', tries: '0/2' },
      { name: 'Контроль по 2 модулю', isActive: false, startDate: '07.06.2019 11:10', endDate: '01.07.2019 15:50', tries: '0/3' },
      { name: 'Підсумковий (екзаменаційний) контроль', isActive: false, startDate: '19.06.2019 09:00', endDate: '01.07.2019 16:00', tries: '0/2' },
      { name: 'Самоконтроль (...)', isActive: true, startDate: '19.02.2020 15:00', endDate: '12.06.2020 15:00', tries: '0/Без обмежень' },
      { name: 'Контроль по 1 модулю', isActive: false, startDate: '16.04.2020 08:00', endDate: '23.04.2020 13:30', tries: '1/3' },
      { name: 'Вхідне тестування', isActive: true, startDate: '--', endDate: '--', tries: '0/1' },
    ],
    doneModulesTable: [{ name: 'Контроль по 1 модулю', startDate: '16.04.2020 11:25', time: '27 хв. 18 с', inactivePercent: '0', mark: '6.93/10' }],
    courseId: '1351',
    name: 'Моделювання та аналіз програмного забезпечення',
    lecturer: 'Петрик Оксана Юліанівна',
  },
  {
    modulesTable: [
      { name: 'Тренувальний тест', isActive: true, startDate: '27.11.2015 13:00', endDate: '06.06.2020 08:00', tries: '0/Без обмежень' },
      { name: 'Ректорський контроль', isActive: false, startDate: '01.12.2016 11:12', endDate: '01.12.2016 11:12', tries: '0/1' },
      { name: 'Ректорський контроль (СПс-31, СПс-32) 2016-12-02', isActive: false, startDate: '02.12.2016 09:30', endDate: '02.12.2016 10:50', tries: '0/1' },
      { name: 'Контроль по 1 модулю', isActive: false, startDate: '12.04.2020 22:00', endDate: '27.04.2020 22:00', tries: '0/3' },
      { name: 'Контроль по 2 модулю', isActive: false, startDate: '12.04.2020 22:00', endDate: '12.04.2020 22:00', tries: '0/3' },
    ],
    doneModulesTable: [false],
    courseId: '1266',
    name: 'Моделювання та видобуток даних (VI семестр)',
    lecturer: 'Бойко Ігор Володимирович',
  },
  {
    modulesTable: [
      { name: 'тест_1', isActive: true, startDate: '03.06.2018 20:00', endDate: '15.06.2020 20:00', tries: '0/Без обмежень' },
      { name: 'тест_2', isActive: true, startDate: '03.06.2018 20:00', endDate: '22.06.2020 16:00', tries: '0/Без обмежень' },
      { name: 'Ректорський контроль (СП-21) 2018-06-07', isActive: false, startDate: '07.06.2018 13:00', endDate: '07.06.2018 14:20', tries: '0/1' },
      { name: 'екзамен', isActive: false, startDate: '02.07.2019 09:00', endDate: '04.07.2019 15:00', tries: '0/1' },
      { name: 'Модуль1', isActive: false, startDate: '24.04.2020 09:00', endDate: '24.04.2020 15:00', tries: '2/4' },
      { name: 'Модуль 2', isActive: true, startDate: '22.05.2020 09:00', endDate: '22.05.2020 14:30', tries: '0/4' },
    ],
    doneModulesTable: [
      { name: 'Модуль1', startDate: '24.04.2020 11:32', time: '16 хв. 24 с', inactivePercent: '0', mark: '13/15' },
      { name: 'Модуль1', startDate: '24.04.2020 11:14', time: '18 хв. 27 с', inactivePercent: '0', mark: '8.33/15' },
    ],
    courseId: '4407',
    name: 'Операційні системи та комп’ютерні мережі',
    lecturer: 'Гащин Надія Богданівна',
  },
];

export default mock;
