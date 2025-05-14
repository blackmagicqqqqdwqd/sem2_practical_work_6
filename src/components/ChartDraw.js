
import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
	
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(400); 


	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
        //console.log(parseFloat(svg.style('height')))
    }); 
	// задаем отступы в svg-элементе
	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};
		
	// вычисляем ширину и высоту области для вывода графиков
   
    const boundsWidth = width > 0 ? width - margin.left - margin.right : 0;
    const boundsHeight = height > 0 ? height - margin.top - margin.bottom : 0;
    
    
	useEffect(() => {
        const svg = d3.select(chartRef.current);
        // выводим прямоугольник, 		
		svg
		.append("rect")
		.attr("x", margin.left)
		.attr("y", margin.top)
		.attr("width",  boundsWidth)
		.attr("height",  boundsHeight)
		.style("fill", "lightgrey");
	});
    

    const indexOY = 1; // диаграмма для максимальных значений
   const [min, max] = d3.extent(props.data.map(d => d.values));	
	
   // let max = d3.extent(props.data.map(d => d.values[1]))[1];
    //let min = d3.extent(props.data.map(d => d.values[0]))[0];

	// формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);
  
     
    const scaleY = useMemo(() => {
        return d3.scaleLog()
    .domain([min * 0.85, ( max)* 1.1 ])
    .range([boundsHeight         ,0      ]);
    }, [boundsHeight, min, max]);

    	
	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        
        const yAxis = d3.axisLeft(scaleY);
       
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        //рисуем график
        
        if(props.typeChart == 1)
        {
            svg .selectAll(".dot")
                .data(props.data)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("cy", d => scaleY(d.values ) )
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", "blue")
            /*
            if (props.oy[1]) {
                svg .selectAll(".dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[0] ) )
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue")
            }*/

            /*if (props.oy[0]) {
                svg .selectAll(".dot")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[indexOY] ) )
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red")            
            }*/
        }
        else {
            /* if (props.oy[1]) {
                svg .selectAll(".dot")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 4)
                    .attr("y",d => scaleY(d.values[0]) )
                    .attr("width", scaleX.bandwidth() / 4 )
                    .attr("height", d=> boundsHeight -  scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue")
            }
    
            if (props.oy[0]) {
                svg .selectAll(".dot")
                .data(props.data)
                .enter()
                .append("rect")
                .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr("y",d => scaleY(d.values[1]) )
                .attr("width", scaleX.bandwidth() / 4 )
                .attr("height", d=> boundsHeight -  scaleY(d.values[1]))
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", "red")           
            }*/
            svg .selectAll(".dot")
                .data(props.data)
                .enter()
                .append("rect")
                .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 4)
                .attr("y",d => scaleY(d.values) )
                .attr("width", scaleX.bandwidth() / 4 )
                .attr("height", d=> boundsHeight -  scaleY(d.values))
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", "blue") 
                
        }
        /* */
        if (props.oy[0] == false && props.oy[1] == false) {
            console.log('erro')
        }

    }, [scaleX, scaleY, props.data]); 

    return (
      <svg ref={ chartRef } height={"400px"} width={"1000px"}>  </svg>
	)
}


export default ChartDraw;
