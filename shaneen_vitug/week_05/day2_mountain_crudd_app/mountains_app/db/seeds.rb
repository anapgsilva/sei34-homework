Mountain.destroy_all

Mountain.create :name => 'Mount Pinatubo', :location => 'Zambales', :elevation => 1445
Mountain.create :name => 'Mount Arayat', :location => 'Pampanga', :elevation => 1026

puts "#{Mountain.count} mountains available."
