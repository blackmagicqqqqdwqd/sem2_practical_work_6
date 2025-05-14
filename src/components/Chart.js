import { useState } from "react";

import * as d3 from "d3";
import ChartDraw from "./ChartDraw";


const Chart = (props) => {
    const [ox, setOx] = useState("Город");
    const [typeChart, setTypeChart] = useState(1);
    const [oy, setOy] = useState("Плотность населения")
    const handleSubmit = (event) => {        
        event.preventDefault();
        setOx(event.target["ox"].value); 
		setOy(event.target["oy"].value)		
        setTypeChart (event.target["TypeChart"].value)
	}


    const createArrGraph =(data, key,column)=>{   
    let groupObj = d3.group(data, d => d[key]);
    let arrGraph =[];
    
    for(let entry of groupObj) {
        let result = 0;
        if (column == "Плотность населения") {
            
            result = d3.mean(entry[1].map(d => d["Плотность населения"]));
        }
        else if (column == "Население") {
            result = d3.sum(entry[1].map(d => d["Население"]));
        }
        else if (column == "Площадь") {
            result = d3.sum(entry[1].map(d => d["Площадь"]));
        }   
        else result = d3.mean(entry[1].map(d => d["Плотность населения"]));
        
        arrGraph.push({labelX : entry[0], values : result});
    }
    

        // порядок возрастания
        if (true)    
            arrGraph.sort( (item1, item2) => {
                return item1.labelX - item2.labelX;
            })
       
        return arrGraph;
    } 
    return (
    
     <>
       <h4>Графи</h4>
       <form onSubmit={ handleSubmit}>
         <span> Значение по оси OX: </span>
         <div>
            <label htmlFor="ox1">Город</label>
            <input type="radio" id="ox1" name="ox" value="Город" defaultChecked={ox} /><br/>
            <label htmlFor="ox2">Континент</label>
            <input type="radio" id="ox2" name="ox" value="Континент" />
        </div>
         <br/>
         <span> Значение по оси OY: </span>
         <div>
            <label htmlFor={"oy1"}>Средняя плотность населения</label>
            <input type="radio" name="oy" id={"oy1"} value="Плотность населения" defaultChecked={oy}></input><br/>
            <label htmlFor={"oy2"}>Суммарное население</label>
            <input type="radio" name="oy" id={"oy2"} value="Население"></input><br/>
            <label htmlFor={"oy3"}>Суммарная площадь</label>
            <input type="radio" name="oy" id={"oy3"} value="Площадь"></input>
         </div>
         <br/>
         <div>
            <label htmlFor={"TypeChart"}>Тип диограммы: </label>
            <select name="TypeChart" defaultValue={typeChart} >
                <option value={0}>Гистограмма</option>
                <option value={1}>Точечная диаграмма</option>
            </select>
         </div>
         <br/>
         
         <p>  
           <button type="submit">Построить </button>
         </p>
       </form>
       <ChartDraw data={  createArrGraph  (props.data, ox, oy)} oy={oy} typeChart={typeChart} />
     </>
     ) //<ChartDraw data={ createArrGraph(props.data, ox)} oy={oy} typeChart={typeChart} />
 }
 
 export default Chart;