"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
let firstUserIdTest = '';
const firstUserBody = {
    email: `connor+${shortid_1.default.generate()}@example.com`,
    password: 'password'
};
let accessToken = '';
let refreshToken = '';
const newFirstName = 'Connor';
const newFirstName2 = 'Michael';
const newLastName = 'Smith';
const newLastName2 = 'Spengler';
describe('users and auth endpoints', () => {
    let request;
    before(() => {
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3QvdXNlcnMvdXNlcnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLHNEQUE4QjtBQUc5QixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFFekIsTUFBTSxhQUFhLEdBQUc7SUFDcEIsS0FBSyxFQUFFLFVBQVUsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsY0FBYztJQUNqRCxRQUFRLEVBQUUsVUFBVTtDQUNyQixDQUFBO0FBQ0QsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7QUFDOUIsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBQ2hDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUM1QixNQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7QUFFaEMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtJQUN4QyxJQUFJLE9BQWlDLENBQUM7SUFDdEMsTUFBTSxDQUFDLEdBQUcsRUFBRTtJQUNaLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==