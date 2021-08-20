let testEmployee = {
  firstName: 'Wilfred',
  familyName: 'Bayudan',
  title: 'Corporate Trainer',
  payPerHour: 30,
  timeInEvents: [
    { type: 'TimeIn', hour: 900, date: '2021-08-07' },
    { type: 'TimeIn', hour: 1400, date: '2021-08-07' },
    { type: 'TimeIn', hour: 1200, date: '2021-08-08' },
    { type: 'TimeIn', hour: 1000, date: '2021-08-09' },
  ],
  timeOutEvents: [
    { type: 'TimeOut', hour: 1000, date: '2021-08-07' },
    { type: 'TimeOut', hour: 1500, date: '2021-08-07' },
    { type: 'TimeOut', hour: 2300, date: '2021-08-08' },
    { type: 'TimeOut', hour: 2300, date: '2021-08-09' },
  ]
}

// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
  let createdRecords = []
  arr.forEach(employee => createdRecords.push(createEmployeeRecord(employee)));
  return createdRecords;
}

function createTimeInEvent(employee, dateStamp) {
  let updatedEmployee = employee;

  const hourDate = dateStamp.split(' ');
  const date = hourDate[0];
  const hour = parseInt(hourDate[1]);

  const timeIn = {
    type: 'TimeIn',
    hour,
    date
  }

  updatedEmployee.timeInEvents.push(timeIn);

  return updatedEmployee;
}

function createTimeOutEvent(employee, dateStamp) {
  let updatedEmployee = employee;

  const hourDate = dateStamp.split(' ');
  const date = hourDate[0];
  const hour = parseInt(hourDate[1]);

  const timeOut = {
    type: 'TimeOut',
    hour,
    date
  }

  updatedEmployee.timeOutEvents.push(timeOut);

  return updatedEmployee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvents = employee.timeInEvents.filter(timeEvent => timeEvent.type === 'TimeIn' && timeEvent.date === date);
  const timeOutEvents = employee.timeOutEvents.filter(timeEvent => timeEvent.type === 'TimeOut' && timeEvent.date === date);
  let hoursWorked = 0;
  if (timeInEvents.length === timeOutEvents.length) {

    for (let i = 0; i < timeInEvents.length; i++) {
      hoursWorked += timeOutEvents[i].hour - timeInEvents[i].hour;
    }

  } else {
    console.log(`Missing punch.`);
  }

  return hoursWorked/100;

}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {

  function filterUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const datesWorked = employee.timeInEvents.map(timeEvent => timeEvent.date).filter(filterUnique);
  
  let allWages = 0;
  datesWorked.forEach(date => allWages += wagesEarnedOnDate(employee, date));
  return allWages;
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.map(employee => allWagesFor(employee)).reduce((a, b) => a + b);
}