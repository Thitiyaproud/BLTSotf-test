/*Create Basic Lotto Service following this requirement

This Basic Lotto Service implements a simple lottery system where users can buy lotto tickets and win based on the drawn result. The lotto service allows users to select the number of digits (from 1 to 6 digits) they wish to bet on, and the system calculates the winnings based on how many digits match the last digits of the randomly drawn 6-digit result. The service should support the purchase of multiple tickets with different numbers and amounts, and users can choose to buy random numbers based on their selected digit length. Additionally, users can specify fixed digits for specific positions in the generated random numbers. The system should also allow users to set the draw result, check winning tickets, and return the corresponding prize based on matching digits.


given: 
- customer can choose to buy ticket that contain many number with different digit example: 123456 for 1000baht, 124 for 500baht
- lotto has 6 digits
- lotto result will draw 1 time which each digit payout is from the last digit example the draw of lotto result is 123456 the prize of 3 digit is 456
- ticket payout base on digit
 1 digit = 10 times of bet example customer buy number 6 for 100 baht and the result is 123456 then the prize is 1000 baht
 2 digit = 100 times of bet example customer buy number 56 for 100 baht and the result is 123456 then the prize is 10000 baht
 3 digit = 1000 times of bet example customer buy number 456 for 100 baht and the result is 123456 then the prize is 100000 baht
 4 digit = 10000 times of bet example customer buy number 3456 for 100 baht and the result is 123456 then the prize is 1000000 baht
 5 digit = 100000 times of bet example customer buy number 23456 for 100 baht and the result is 123456 then the prize is 10000000 baht
 6 digit = 1000000 times of bet example customer buy number 123456 for 100 baht and the result is 123456 then the prize is 100000000 baht


key features:
- buy ticket: buy lotto by input number and amount of money and add to customer ticket
- get ticket: get all ticket that customer buy
- get random number: select digit that want to buy from 1-6 digits, how many numbers to buy, how much money for each number, and optional customer can select fixed number of digit (example: 5 digits, 10 number, 1000 baht and 4th digit is 5 and 5th digit is 6 then output must be random 10 number that last 2 digit is 56)
- set draw: set payout randomly one munber and used for the current draw result
- check win ticket: check winning prize by input all ticket that customer buy and return which number is win and prize
*/

//Example data
const buyTicket = [
  {
    number: 1234,
    amount: 1000,
  },
  {
    number: 58,
    amount: 1000,
  },
];

//Example data for buy random number
const buyDigit = 4;
const buyNumber = 10;
const buyAmount = 1000;
const fixedDigit = [
  {
    digit: 3,
    number: 8,
  },
  {
    digit: 2,
    number: 6,
  },
];
// mean that customer want to buy 4 digits, 10 number, each 1000 baht,fxied third digit is 8 and fixed second digit is 6

class LottoService {
  customerTicket: { number: string; amount: number }[]; //please change any to the correct type
  drawResult: string | null;
  constructor() {
    this.customerTicket = []; // Stores all bought tickets
    this.drawResult = null; // Stores the current draw result
  }

  buyTicket( number: string, amount: number ): void {
    this.customerTicket.push({ number, amount });
  }

  getTicket() : { number: string; amount: number }[] {
    return this.customerTicket;
  }

  getRandomNumber() : { number: string; amount: number }[] {

    const digit = buyDigit;
    const count = buyNumber;
    const amount = buyAmount;
  
    const randomTickets: { number: string; amount: number }[] = [];

    for (let i = 0; i < count; i++) {

      // Generate random numbers
      let randomNumber = Array(digit)
        .fill(0)
        .map(() => Math.floor(Math.random() * 10));
  
      // Modify the number according to the fixed positions
      for (const fix of fixedDigit) {
        randomNumber[fix.digit - 1] = fix.number;
      }
  
      // Convert the array to a string and add to the results
      randomTickets.push({ number: randomNumber.join(""), amount });
    }
  
    this.customerTicket.push(...randomTickets);
    return randomTickets;
  }

  setDraw(): string {

    // Generate a 6-digit random result
    const result = Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join("");

    this.drawResult = result;
    return result;
  }

  checkWinTicket(): { number: string; amount: number; prize: number }[] {
    if (!this.drawResult) {
      throw new Error("Draw result has not been set yet.");
    }

    const results: { number: string; amount: number; prize: number }[] = [];

    for (const ticket of this.customerTicket) {
      const matchedDigits = this.getMatchedDigits(ticket.number, this.drawResult);
      if (matchedDigits > 0) {
        const prize = ticket.amount * Math.pow(10, matchedDigits);
        results.push({ number: ticket.number, amount: ticket.amount, prize });
      }
    }

    return results;
  }

  // Helper function to calculate the number of matching digits
  private getMatchedDigits(ticketNumber: string, result: string): number {
    let matchCount = 0;
    for (let i = 1; i <= ticketNumber.length; i++) {
      if (
        ticketNumber[ticketNumber.length - i] === result[result.length - i]
      ) {
        matchCount++;
      } else {
        break;
      }
    }
    return matchCount;
  }
}

// Usage example
const lottoService = new LottoService();

// Buy specific numbers
lottoService.buyTicket("1234", 1000);
lottoService.buyTicket("58", 1000);
console.log(lottoService.getTicket());

// Generate random numbers
const randomTickets = lottoService.getRandomNumber();
console.log("Random Tickets:", randomTickets);

// Set the draw result
const drawResult = lottoService.setDraw();
console.log("Draw Result:", drawResult);

// Check for winning tickets
const winnings = lottoService.checkWinTicket();
console.log("Winnings:", winnings);