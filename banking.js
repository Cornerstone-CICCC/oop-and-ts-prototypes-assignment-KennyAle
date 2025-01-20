function Account(accountNumber, balance) {
    this._accountNumber = accountNumber
    this._balance = balance
}
Account.prototype.deposit = function (amount) {
    this._balance += amount
    console.log(`Deposited $${amount}. New balance: $${this._balance}`)
}
Account.prototype.withdraw = function (amount) {
    this._balance -= amount
    if (amount > this._balance) {
        console.log(`Insufficient funds. Current balance: $${this._balance}`)
        return
    }
    this._balance -= amount
    console.log(`Withdrew $${amount}. Remaining balance: $${this._balance}`)
}

function SavingsAccount(accountNumber, balance, intRate) {
    Account.call(this, accountNumber, balance)
    this._interestRate = intRate
}

Object.setPrototypeOf(SavingsAccount.prototype, Account.prototype)
SavingsAccount.constructor = SavingsAccount

SavingsAccount.prototype.addInterest = function () {
    const interest = this._balance * (this._interestRate / 100)
    this._balance += interest
    console.log(`Interest added (${this._interestRate}%): $${interest.toFixed(2)}. New balance: $${this._balance.toFixed(2)}`)
}

function CheckingAccount(accountNumber, balance) {
    Account.call(this, accountNumber, balance)
}

Object.setPrototypeOf(CheckingAccount.prototype, Account.prototype)
CheckingAccount.constructor = CheckingAccount

CheckingAccount.prototype.withdrawUsingCheck = function (amount) {
    if (amount > this._balance) {
        console.log(`Overdraft not allowed. Current balance: $${this._balance}`)
        return
    }
    this._balance -= amount
    console.log(`Check withdrawal of $${amount}. Remaining balance: $${this._balance}`)
}

console.log("First Instance");
const example1 = new Account("123456789", 1000)
example1.withdraw(100)

console.log("\nSecond Instance");
const saving = new SavingsAccount("1234", 1000, 5)
saving.deposit(500)
saving.addInterest()

console.log("\nThird Instance");
const checking = new CheckingAccount("1234", 1000)
checking.withdrawUsingCheck(200)
