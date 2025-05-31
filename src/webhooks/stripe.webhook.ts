// src/webhooks/stripe.webhook.ts
import express from 'express';
import Stripe from 'stripe';
import usersDao from '../users/dao/users.dao';
import { PermissionFlag } from '../shared/middleware/shared.permissionflag.enum';
import argon2 from 'argon2';
import crypto from 'crypto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:stripe-webhook');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const handleStripeWebhook = async (req: express.Request, res: express.Response) => {
  const sig = req.headers['stripe-signature']!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  log(`Received event: ${event.type}`);

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await createUserFromStripeSession(session);
  }

  res.json({ received: true });
};

async function createUserFromStripeSession(session: Stripe.Checkout.Session) {
  try {
    log('Processing checkout completed event');
    
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    
    if (!customerEmail) {
      log('No customer email found in session');
      return;
    }

    // Check if user already exists
    const existingUser = await usersDao.getUserByEmail(customerEmail);
    if (existingUser) {
      log(`User already exists: ${customerEmail}`);
      return;
    }

    // Generate a temporary password
    const tempPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await argon2.hash(tempPassword);
    
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
      permissionFlags: PermissionFlag.PAID_PERMISSION, // Set to paid user
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
    };

    const userId = await usersDao.addUser(userData);
    log(`User created successfully: ${customerEmail} with ID: ${userId}`);
    
    // TODO: Send welcome email with temporary password
    console.log(`TEMP PASSWORD for ${customerEmail}: ${tempPassword}`);
    
  } catch (error) {
    log('Error creating user from Stripe session:', error);
  }
}