const process = (amount) =>{
    let money = [100000,50000,20000,10000,5000,2000,1000,500,100,50]
    
    let i = 0
    let res = {}
    while(amount && money[i]){
        
        if(amount>=money[i]){
            res[money[i]]=~~(amount/money[i]);
            amount %=money[i];
        }
        i+=1
    }
    
    return {result:res,left:amount}
};

const resultview = (result)=>{
    var viewResult = '';
    var viewResult2
    var left = result.left ===undefined ? '':
        (result.left===0?'':' Left Rp'+result.left+' (no available fraction)');
    for(let i in result.result){
        viewResult+='Rp'+i+', '+result.result[i]+'x '
    }
    viewResult = viewResult.split(' ')
    viewResult = viewResult.reverse()
    viewResult.shift()
    
    viewResult = viewResult.join(' ')+left;
    viewResult2 = viewResult.substring(0, viewResult.length - 1);
    return [viewResult,viewResult2,left]
}


export default {
    process:process,
    resultview:resultview
};