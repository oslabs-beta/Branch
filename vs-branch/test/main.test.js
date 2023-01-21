/**
 * @jest-environment jsdom
 */
const request = require('supertest');
const server = 'http://localhost:3000';
const {
  sum,
  subtract,
  click,
  checkRoute,
  addParams,
  checkParam,
  deleteItem,
  put,
  deleteReqBody,
} = require('../src/main.js');

//=====================
// Sample simple tests to ensure communication with main.js - ln 437 & 441
//=====================
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('subtracts 3 - 1 to equal 2', () => {
  expect(subtract(3, 1)).toBe(2);
});

//=====================
// click - ln 215
//=====================

//=====================
// checkRoute - ln 334
//=====================

describe('GET requests to /chore/:chore', () => {
  it('responds with status code 200', (done) => {
    request(server)
      .get('/chore/:chore')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

//=====================
// addParams - ln 355
//=====================

// describe('adding parameters to bodyObj', () => {
//   it('adds info to bodyObj and HTML', (done) => {
//     // build mock doc with dummy key/val data
//     const mockKey = 'dummy-key';
//     const mockValue = 'dummy-value';
//     const newDiv = document.createElement('div');
//     newDiv.setAttribute('key', mockKey);
//     newDiv.setAttribute('value', mockValue);
//     newDiv.setAttribute('class', 'reqObj');
//     document.body.appendChild(newDiv);
//     // - expect req.innerHTML to be empty
//     // - expect keyInfo to be dummy-key
//     // - expect valueInfo to be "dummy-value"
//     // - expect document.interText to be key/value pair

//     expect(addParams().toBe());
//   });
//   it('receive error if keyInfo is empty', (done) => {});
//   it('receive error if valueInfo is empty', (done) => {});
// });

//=====================
// checkParams - ln  371
//=====================

describe('Requests to /chore', () => {
  it('responds with status code and returns posted info', (done) => {
    request(server)
      .post('/chore')
      .send({
        chore: 'TESTCHORE',
        room: 'TESTROOM',
      })
      .expect(200)
      .expect({
        chore: 'TESTCHORE',
        room: 'TESTROOM',
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

//=====================
// deleteItem - ln 385
//=====================

//=====================
// put - ln 408
//=====================

//=====================
// deleteReqBody - ln 432
//=====================
