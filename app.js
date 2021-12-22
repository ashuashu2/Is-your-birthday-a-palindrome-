var dateInput = document.querySelector(".date-input");
var showButton = document.querySelector(".show-button");
var outputBox = document.querySelector(".output-box");



function reverseStr(str) {
return str.split("").reverse().join("")
    
}

function isPalindrome(str) {
var reverse = reverseStr(str)
if(str===reverse){  
return true;
}
    return false;


}


function convertDateToStr(date){
    var dateStr ={day:"", month:"" ,year:""}
    if (date.day<10){
        dateStr.day = "0"+ date.day;
    }else{
        dateStr.day= date.day.toString();
    }
    if (date.month<10){
        dateStr.month = "0" + date.month;
    }else{
        dateStr.month= date.month.toString();
    }
   
        dateStr.year= date.year.toString();
    return dateStr;
    
    }
   




function getAllDateFormats(date){
    var dateStr = convertDateToStr(date)
    
var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(-2);
var MMDDYY =  dateStr.month + dateStr.day + dateStr.year.slice(-2);
var YYMMDD = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
return [
    DDMMYYYY ,
    MMDDYYYY,
    YYYYMMDD,
    DDMMYY,
    MMDDYY,
    YYMMDD
];
}
function checkPalindromeForAllFormats (date){

    var flag= false;
    for ( var i = 0; i < getAllDateFormats(date).length; i++){
        if (isPalindrome(getAllDateFormats(date)[i])){
            flag = true;
            break;
        }
      

    }
    return  flag

}



function isLeapYear(year) {
    if (year % 400 === 0) 
    return true;
  
    if (year % 100 === 0) 
    return false;
  
    if (year % 4 === 0)
     return true;
  
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }

function getNextPalindromeDate(date){
  var ctr = 0;
  var nextDate = getNextDate(date)
  while(1){
    ctr++;
    var isPalindrome= checkPalindromeForAllFormats(nextDate)
    if (isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate)

  }
  return[ctr,nextDate]
}
function showButtonClickHandler(e){
  var bdayStr = dateInput.value 
  if (bdayStr !== ""){
    var listOfDate = bdayStr.split("-")
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    }
    var isPalindrome = checkPalindromeForAllFormats(date)
    if (isPalindrome){
      outputBox.innerText = "YAY! Your Birthday Is A Palindrome"
    }
    else{
      var [ ctr,nextDate] = getNextPalindromeDate(date)
      outputBox.innerText = `The Next Palindrome Date Is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You Missed By ${ctr} Days `
      


  }
}
}
showButton.addEventListener("click", showButtonClickHandler);





