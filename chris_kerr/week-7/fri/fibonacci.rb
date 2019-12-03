
### O(n) - I think that this is linear ### 

def fibonacci_recursive l
    if l > 2
        sequence = fibonacci_recursive l-1 
        sequence << ( sequence[-1] + sequence[-2] )
    else 
        [1,1]
    end
end

def fibonacci n
    fibonacci_recursive(n).last
end



##### geometric O(2^n) - visually clean but badly optimised ##### 
def fib2 n 
    if n == 1 || n == 2
        1
    else
        fib2(n-1) + fib2(n-2)
    end 
end

require 'pry'
binding.pry