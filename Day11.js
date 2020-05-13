function keepingIt100(expr, remaining) {
   if (remaining.length === 1) {
      if (eval(expr + remaining[0]) === 100) {
         console.log(expr + remaining[0]);
      }
   } else {
       keepingIt100(expr + remaining[0] + "", remaining.slice(1));
       keepingIt100(expr + remaining[0] + "+", remaining.slice(1));
       keepingIt100(expr + remaining[0] + "-", remaining.slice(1));
   }   
}

keepingIt100("", [1,2,3,4,5,6,7,8,9]);