require 'json'

Page = Struct.new(:name, :content) do
	def self.from_map(map)
		# implement from_map to pass the specifications found in page_spec.rb
		if map['name'] && map['content']
			Page.new(map['name'], map['content'])
		else
			Page.new('Contentless')
		end
	end

	def self.ingest (json)
		obj = JSON.parse(json)
		obj.inject([]) {|c, item|
				c << Page.new(item['name'], item['content'])
			}
	end
end

class Page
	def initializer(name, content)
		@name = name
		@content = content
	end
end
