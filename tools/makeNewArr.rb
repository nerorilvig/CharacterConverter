puts "Input array name"
arrName=gets.chomp()
fileName=arrName+".js"
puts "Input array size"
arrSize=gets.chomp().to_i
File .open(fileName,"w")do|f|
  f.puts "var rome = newArray(#{arrSize.to_s});"
  f.puts "var #{arrName} = newArray(#{arrSize.to_s});"
  for i in 0..arrSize-1
    if(i<10)
      f.puts "rome[#{i.to_s}]   = \"\"; #{arrName}[#{i.to_s}]   = \"\";"
    elsif(i>=10 && i<100)
      f.puts "rome[#{i.to_s}]  = \"\"; #{arrName}[#{i.to_s}]  = \"\";"
    elsif(i>=100 && i<1000)
      f.puts "rome[#{i.to_s}] = \"\"; #{arrName}[#{i.to_s}] = \"\";"
    end
  end
end
