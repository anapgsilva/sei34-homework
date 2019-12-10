# Pages

## Overview:
This is an incomplete project which consists of a Page object with basic functionality.  Your job is to complete the implementation of Page to make the specifications pass.  Afterwards you will be asked to attempt to add some more functionality to Page. 

To get started you will need to install all of the project dependencies: `bundle install`

### Page
A Page object holds information on a web page.  An instance of page holds the name of the page and the contents of the page.

    page = Page.new('Page Name', 'The contents of the page.')
    page.name # => 'Page Name'
    page.content # => 'The contents of the page.'

### Page Specification
To execute a page spec execute the default rake task: `bundle exec rake`

## What to do
1. To get started we would like a convenient method to construct a Page given a String => String map.  Please implement *Page.rom_map* to pass the specifications.
2. Next, we would like to be able to take content from a JSON feed we receive from a Partner and build a collection of Pages.  Please implement the *Page.ingest*  method. (Note: it should not be necesary to write your own json parser here)
3. Finally, our partner would like to send us JSON which includes all the links between the pages in a seperate property:

    [
    	{"name": "parent",  "links": ["child1", "child2"]},
    	{"name": "child1"},
    	{"name": "child2"}
    ]

We would like to ingest the links by mapping each String in the list to a Page with a matching same name.  The JSON above should return something like the array defined below when we ingest it:

    child1 = Page.from_map('name' => 'child1')
    child2 = Page.from_map('name' => 'child2')
    [ Page.from_map('name' => 'parent', 'links' => [child1, child2]), child1, child2 ]