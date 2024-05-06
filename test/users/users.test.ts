import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';
import mongoose from 'mongoose';

let firstUserIdTest = '';

const firstUserBody = {
  email: `connor+${shortid.generate()}@example.com`,
  password: 'password'
}
let accessToken = '';
let refreshToken = '';
const newFirstName = 'Connor';
const newFirstName2 = 'Michael';
const newLastName = 'Smith';
const newLastName2 = 'Spengler';

describe('users and auth endpoints', () => {
  let request: supertest.SuperAgentTest;
  before(() => {
  })
})