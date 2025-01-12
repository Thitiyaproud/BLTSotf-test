Basic Lotto Service

## Overview

The Basic Lotto Service is a simple lottery system that allows users to purchase lotto tickets, generate random lotto numbers, and check winnings based on a drawn result. Users can customize their tickets with specific numbers and amounts or generate random numbers with fixed digits. The system calculates winnings based on the number of matching digits from the drawn result.

## Features

Buy Ticket: Users can buy lotto tickets by specifying numbers and the amount of money to bet.

Get Tickets: Retrieve all tickets purchased by the user.

Generate Random Numbers: Users can generate random numbers by selecting the digit length (1-6), number of tickets, amount for each ticket, and optionally fixing specific digits.

Set Draw: Set a random 6-digit number as the draw result.

Check Winnings: Evaluate all purchased tickets against the draw result and calculate the prize for each winning ticket.

## Setup and Usage

1. Clone this repository

   ```bash
   git clone https://github.com/Thitiyaproud/BLTSotf-test.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the Project

   ```bash
   npm run dev
   ```

## Example Usage

const lottoService = new LottoService();

// Buy specific tickets
lottoService.buyTicket("1234", 1000);
lottoService.buyTicket("58", 1000);
console.log(lottoService.getTicket());

// Generate random tickets
const randomTickets = lottoService.getRandomNumber();
console.log("Random Tickets:", randomTickets);

// Set draw result
const drawResult = lottoService.setDraw();
console.log("Draw Result:", drawResult);

// Check winnings
const winnings = lottoService.checkWinTicket();
console.log("Winnings:", winnings);

## Assumptions

1. Ticket Validation

The ticket numbers are validated to ensure they are between 1 to 6 digits.

The amount for each ticket must be a positive integer.

2. Random Number Generation

Random numbers are generated based on the digit length specified by the user.

Fixed digits (if any) are correctly placed in the generated random numbers.

3. Winning Calculation

The prize multiplier is determined by the number of matching digits from the last digits of the draw result.

Only tickets with at least one matching digit qualify for a prize.

4. Draw Result

A new draw result must be set before checking winnings.

The draw result is a randomly generated 6-digit number.
