Page = Struct.new(:name, :content) do
	def self.from_map(map)
		# implement from_map to pass the specifications found in page_spec.rb
    Page.new({name: map['name'], content: map['content']})
	end
end

class Page
  def initializer(name, content)
    @name = name
    @content = content
  end
end