//Event Listener for Submit
document.getElementById('loan-form').addEventListener('submit',
function(e){
//Hide results
document.getElementById('results').style.display='none';
//Show Loader
document.getElementById('loading').style.display='block';

//2 saniye sonra calculateResults fonksiyonunu çalıştırır.
setTimeout(calculateResults,2000);

e.preventDefault();



});

//Calculate Results
function calculateResults(){
   console.log('Calculating...');
   //UI Vars
   const amount=document.getElementById('amount');
   const interest=document.getElementById('interest');
   const years=document.getElementById('years');
   const monthlyPayment=document.getElementById('montly-payment');
   const totalPayment=document.getElementById('total-payment');
   const totalInterest=document.getElementById('total-interest');

   const principal=parseFloat(amount.value);
   const calculatedInterest=parseFloat(interest.value) / 100 / 12;
   const calculatedPayments=parseFloat(years.value)*12;

   //Compute monthly payment
   const x=Math.pow(1+calculatedInterest,calculatedPayments);
   const monthly=(principal*x*calculatedInterest)/(x-1);

   if(isFinite(monthly)){
       monthlyPayment.value=monthly.toFixed(2);//shows 2 digits after comma
       totalPayment.value=(monthly*calculatedPayments).toFixed(2);
       totalInterest.value=((monthly*calculatedPayments)-principal).toFixed(2);
       document.getElementById('results').style.display='block';
       document.getElementById('loading').style.display='none';

   }else{

      
       showError('Please check your numbers');
   }


}


//Show Error
function showError(error){

    //document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='none';

     //Create a div
     const errorDiv=document.createElement('div');

     //Get elements
     const card=document.querySelector('.card');
     const heading=document.querySelector('.heading');

     //Add class
     errorDiv.className='alert alert-danger';//alert-danger gives red colour

     //Create text node and append to div
     errorDiv.appendChild(document.createTextNode(error));

     //Insert error above heading
     card.insertBefore(errorDiv,heading);

     //Clear error after 3 seconds
     //3 saniye sonra clearError fonksiyonunu çalıştırır.
     setTimeout(clearError,3000);//3000ms=3s
     

}

//Clear error
function clearError(){
    document.querySelector('.alert').remove();
}