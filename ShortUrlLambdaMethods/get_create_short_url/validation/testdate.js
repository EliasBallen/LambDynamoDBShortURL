
function testDate(date,nowDate){
    if(typeof date === 'number'){
    const timewait = date - nowDate
        if(timewait > 86400  //more than 24 hours minimun
            && 
            timewait < (5*3.154e+7)) // less than 5 years
            {
            return true;
            }else{
            return false;
            }   
    }else{
    throw new Error("Date Data type is not correct, must be Unix epoch time format")
    }    
}
module.exports = {testDate}