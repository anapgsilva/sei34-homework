require 'pry'

class Calc

  def initialize question
    @question = question
    matches
  end

  def matches
    @matches = @question.match(/(-?\d+) (plus|minus|multiplied by|divided by) (-?\d+)/)
  end

  def first_int
    @matches[1].to_i
  end

  def operator
    case @matches[2]
    when 'plus' then :+
    when 'minus' then :-
    when 'multiplied by' then :*
    when 'divided by' then :/
    end
  end

  def second_int
    @matches[3].to_i
  end

  def answer
    @answer = first_int.send(operator, second_int)
  end
end

c1 = Calc.new "What is 5 plus 13?"
# binding.pry

c2 = Calc.new "What is 7 minus 5?"
c3 = Calc.new "What is -6 multiplied by 4?"
c4 = Calc.new "What is 25 divided by -5?"

p c1.answer
p c2.answer
p c3.answer
p c4.answer
