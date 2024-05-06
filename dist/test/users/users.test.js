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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L3VzZXJzL3VzZXJzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxzREFBOEI7QUFHOUIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBRXpCLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLEtBQUssRUFBRSxVQUFVLGlCQUFPLENBQUMsUUFBUSxFQUFFLGNBQWM7SUFDakQsUUFBUSxFQUFFLFVBQVU7Q0FDckIsQ0FBQTtBQUNELElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyQixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQzlCLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUNoQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFDNUIsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDO0FBRWhDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsSUFBSSxPQUFpQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7SUFDWixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=