//append a secuence to make the hashing and encoding unpredictable
let seqadd = 1
function addseq(str){
    seqadd++;
    return str+''+seqadd;
}
module.exports = {addseq}