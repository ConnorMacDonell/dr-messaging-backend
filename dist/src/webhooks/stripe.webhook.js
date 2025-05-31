"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const stripe_1 = __importDefault(require("stripe"));
const users_dao_1 = __importDefault(require("../users/dao/users.dao"));
const shared_permissionflag_enum_1 = require("../shared/middleware/shared.permissionflag.enum");
const argon2_1 = __importDefault(require("argon2"));
const crypto_1 = __importDefault(require("crypto"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:stripe-webhook');
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        log(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    log(`Received event: ${event.type}`);
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await createUserFromStripeSession(session);
    }
    res.json({ received: true });
};
exports.handleStripeWebhook = handleStripeWebhook;
async function createUserFromStripeSession(session) {
    try {
        log('Processing checkout completed event');
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name;
        if (!customerEmail) {
            log('No customer email found in session');
            return;
        }
        // Check if user already exists
        const existingUser = await users_dao_1.default.getUserByEmail(customerEmail);
        if (existingUser) {
            log(`User already exists: ${customerEmail}`);
            return;
        }
        // Generate a temporary password
        const tempPassword = crypto_1.default.randomBytes(8).toString('hex');
        const hashedPassword = await argon2_1.default.hash(tempPassword);
        // Split name into first and last name
        const nameParts = customerName?.split(' ') || ['', ''];
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        // Create new user using your existing DAO
        const userData = {
            email: customerEmail,
            password: hashedPassword,
            firstName,
            lastName,
            permissionFlags: shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION, // Set to paid user
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
        };
        const userId = await users_dao_1.default.addUser(userData);
        log(`User created successfully: ${customerEmail} with ID: ${userId}`);
        // TODO: Send welcome email with temporary password
        console.log(`TEMP PASSWORD for ${customerEmail}: ${tempPassword}`);
    }
    catch (error) {
        log('Error creating user from Stripe session:', error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLndlYmhvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2ViaG9va3Mvc3RyaXBlLndlYmhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsb0RBQTRCO0FBQzVCLHVFQUE4QztBQUM5QyxnR0FBaUY7QUFDakYsb0RBQTRCO0FBQzVCLG9EQUE0QjtBQUM1QixrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWtCLENBQUMsQ0FBQztBQUVuRCxNQUFNLG1CQUFtQixHQUFHLEtBQUssRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsRUFBRTtJQUN2RixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFFLENBQUM7SUFDN0MsSUFBSSxLQUFtQixDQUFDO0lBRXhCLElBQUksQ0FBQztRQUNILEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFzQixDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUFDLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLDBDQUEwQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM3RCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsR0FBRyxDQUFDLG1CQUFtQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVyQyw4Q0FBOEM7SUFDOUMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFL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