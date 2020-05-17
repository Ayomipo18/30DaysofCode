const pascalTriangle = (noOfRows) =>{
    let triangle = [[1], [1,1]];

    const generateRow = (triangle) =>{
        let previous = triangle[triangle.length - 1];
        let newRow = [1];
        for(let i = 0; i < previous.length - 1; i++){
            let current = previous[i];
            let next = previous[i+1] ;
            newRow.push(current + next)
        };
        newRow.push(1);
        return triangle.push(newRow);
    };
    
    if(noOfRows === 0){
        return []
    } else if(noOfRows == 1){
        return [[1]]       
    } else if(noOfRows == 2){
        return  [[1], [1,1]]
    } else {      
        for(let i = 2; i < noOfRows; i++){       
            generateRow(triangle)
        }
    }
    return triangle;
    
};

console.log(pascalTriangle(6));
console.log(pascalTriangle(8));
