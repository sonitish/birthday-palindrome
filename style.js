const birthDay = document.querySelector(".date");
const submitBtn = document.querySelector(".submit-btn");
const output = document.querySelector(".output");
animationDate = document.querySelector(".animation-date");
calculationAnimation = document.querySelector(".calculation-animation")

function calculation() {
    output.style.display = "block";
    const [year, month, date] = birthDay.value.split("-");
    const isPalindrome = checkAllFormatForPalindrome(date, month, year);
    if (isPalindrome) {
        output.innerText = "Whoa!!! Your birthdate in format " + date + "-" + month + "-" + year + " is palindrome";
    }
    else {
        const [nearestPalindromeDate, missedDays] = findNearestPalindromeDateAndMissedDays(date, month, year);
        output.innerText = "Awww! Your birthdate is not palindrome. Nearest palindrome date is " + nearestPalindromeDate + "," + "You missed it by " + missedDays + " days.";

    }
    calculationAnimation.style.display = "none";
    animationDate.style.display = "block";
}
submitBtn.addEventListener("click", function () {
    if (birthDay.value == "") {
        alert("please enter date");
    }
    else {
        animationDate.style.display = "none";
        calculationAnimation.style.display = "block";
        setTimeout(calculation, 1500);
    }
});

function checkPalindrome(currentDateString) {
    let i = 0;
    let j = currentDateString.length - 1;
    while (i < j) {
        if (currentDateString[i] !== currentDateString[j]) {
            return false;
        }
        i++; j--;
    }
    return true;
}

function checkAllFormatForPalindrome(date, month, year) {
    let firstFormat = date + month + year;
    let secondFormat = month + date + year;
    let thirdFormat = month + date + year.substring(2);
    let fourthFormat = year + month + date;

    if (checkPalindrome(firstFormat)) return `${date}-${month}-${year}`;
    if (checkPalindrome(secondFormat)) return `${month}-${date}-${year}`;
    if (checkPalindrome(thirdFormat)) return `${month}-${date}-${(year).substring(2)}`;
    if (checkPalindrome(fourthFormat)) return `${year}-${month}-${date}`;

    return "";
}
function daysInMonth(month) {
    return [
        31,
        Number(`${new Date().getFullYear() % 4 ? 29 : 28}`),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ][month];
}

function checkCurrentDateisPalindromeOrNot(date, month, year) {
    let dateString = String(date);
    let monthString = String(month);
    let yearString = String(year);
    if (dateString.length === 1) {
        dateString = "0" + dateString;
    }
    if (monthString.length === 1) {
        monthString = "0" + monthString;
    }
    return checkAllFormatForPalindrome(dateString, monthString, yearString);
}

function findNearestPalindromeDateAndMissedDays(date, month, year) {
    let forwardDate = Number(date);
    let forwardMonth = Number(month);
    let forwardYear = Number(year);

    let backwardDate = Number(date);
    let backwardMonth = Number(month);
    let backwardYear = Number(year);

    let missedDays = 0;
    while (true) {
        missedDays += 1;

        // after birthday
        forwardDate += 1;
        if (forwardDate > daysInMonth(forwardMonth - 1)) {
            forwardDate = 1;
            forwardMonth += 1;

            if (forwardMonth > 12) {
                forwardMonth = 1;
                forwardYear += 1;
            }
        }

        const checkForwardDateForPalindrome = checkCurrentDateisPalindromeOrNot(forwardDate, forwardMonth, forwardYear);
        if (checkForwardDateForPalindrome !== "") {
            return [checkForwardDateForPalindrome, missedDays];
        }

        //before birthday

        backwardDate -= 1;
        if (backwardDate < 1) {
            backwardMonth -= 1;
            if (backwardMonth < 1) {
                backwardYear -= 1;
                if (backwardYear < 1) {
                    return ["", ""];
                }
                else {
                    backwardMonth = 12;
                    backwardDate = 31;
                }
            }
            else {
                backwardDate = daysInMonth(backwardMonth - 1);
            }
        }
        const checkBackwardDateForPalindrome = checkCurrentDateisPalindromeOrNot(backwardDate, backwardMonth, backwardYear);
        if (checkBackwardDateForPalindrome !== "") {
            return [checkBackwardDateForPalindrome, missedDays];
        }
    }
}