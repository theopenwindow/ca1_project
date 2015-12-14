var width = 1300,
    height =700;


var svg = d3.select('#vis').append('svg')
    .attr('width', width)
    .attr('height', height);

var projection = d3.geo.mercator()
    .center([-119, 37])
    .scale(3200)
    .translate([width / 2, height / 2 - 20])
    .clipExtent([[0, 0], [width, height + 1]])
    .precision(0);

var projectPath = d3.geo.path()
                    .projection(projection);

var g = svg.append('g');
var countryById = d3.map();


d3.json("data/usatopo.json", function(error, usatopo) {
console.log(usatopo);

    var map = topojson.feature(usatopo, usatopo.objects.units);
    var countries = map.features;
    console.log(countries);


    svg.selectAll("path.countries")
       .data(countries)
       .enter()
       .append("path")
       .attr("class", "map")
       .attr("d", projectPath)
       .attr("id",function(d){
        return d.properties.name;
       })
       .attr("fill", function(d){
        if(d.properties.name == "California"){
          console.log(d)
          return "red";
        }
       });


    d3.csv("data/route.csv", function(error, route){

      var routePath = d3.svg.line()
                      .x(function(d){
                        return projection([+d.lon, +d.lat])[0];
                      })
                      .y(function(d){
                        return projection([+d.lon, +d.lat])[1];
                      });

      var pathArcs = svg.append("path")
                        .datum(route)
                        .attr("d", routePath)
                        .attr("class", "route");

        var nodes = [];
        for(var i=0, len=route.length-1; i<len; i++){
            nodes.push(
                    [ +route[i].lon, +route[i].lat ],
                    [ +route[i+1].lon, +route[i+1].lat ]
            );
        };
     
/////////////////////////////try car
        var car = svg.append("svg:image")
                   .attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/2/21/Convertible2-05.svg")
                   .attr("width", 25)
                   .attr("height", 25)
                   .attr("id", "car");

        var pauseValues = {
          lastT: 0,
          currentT: 0
        };

        function transition() {
            car.transition()
               .duration(30000)
               .attrTween("transform", translateAlong(pathArcs.node()))
               .each("end", function(){
                pauseValues = {
                  lastT: 0,
                  currentT: 0
                };
                transition()
              });
        }
          
        function translateAlong(path) {
          var l = path.getTotalLength();
          return function(d,i) {
            return function(t) {
              t += pauseValues.lastT;
              var p = path.getPointAtLength(t * l);
              pauseValues.currentT = t;
              return "translate(" + p.x + "," + p.y + ")";
            }
          }
        }


        d3.select('button').on('click',function(d,i){
          var self = d3.select(this);
          if (self.text() == "Pause"){
            self.text('Play');
            car.transition()
              .duration(0);
            setTimeout(function(){
              pauseValues.lastT = pauseValues.currentT;
            }, 100);
          }else{
            self.text('Pause');
            transition();
          }
        });
        //transition();
               });
    })