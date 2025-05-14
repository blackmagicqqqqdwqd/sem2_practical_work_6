import { useState } from "react";
import Options from "./Options";
import structure from "../data"

const Sort = (props) => {
    let defaultOptions = Object.keys(structure[0]);
    defaultOptions.unshift('Нет');

    let s = props.data.map(item => item);
    const [selects, setSelects] = useState([
        {
            data: defaultOptions,
            id: 1,
            disAbled: false,
            value: "Нет"
        },
        {
            data: defaultOptions,
            id: 2,
            disAbled: true,
            value: "Нет"
        },
        {
            data: defaultOptions,
            id: 3,
            disAbled: true,
            value: "Нет"
        },
    ]);

    const [descending, setDescending] = useState([false, false, false]);

    const clear = () => {
        setSelects([
            {
                data: defaultOptions,
                id: 1,
                disAbled: false,
                value: "Нет"
            },
            {
                data: defaultOptions,
                id: 2,
                disAbled: true,
                value: "Нет"
            },
            {
                data: defaultOptions,
                id: 3,
                disAbled: true,
                value: "Нет"
            }
        ]);
        setDescending([false, false, false]);
        props.filtering(props.fullData);
    };

    function f(id, v) {
        let res = [];
        if (v != "Нет") {
            res = selects.map(select => {
                if (id <= 2 && select.id == id + 1) return { ...select, disAbled: false };
                else if (id == select.id) return { ...select, value: v };
                else return { ...select };
            });
        } else {
            res = selects.map(select => {
                if (select.id > id) return { ...select, disAbled: true, value: "Нет" };
                if (id == select.id) return { ...select, value: "Нет" };
                else return { ...select };
            });
        }

        setSelects(res);
    }

    let createSortArr = () => {
        return selects.reduce((acc, select, index) => {
            if (select.value !== "Нет") {
                acc.push({
                    column: select.value,
                    order: descending[index] // Используем состояние для порядка сортировки
                });
            }
            return acc;
        }, []);
    };

    const SortTable = (event) => {
        event.preventDefault();
        let sortArr = createSortArr();
       
        if (sortArr.length === 0) {
            props.filtering(props.fullData);
            return false;
        }

        let arr = [...props.fullData];

        arr.sort((first, second) => {
            for (let i = 0; i < sortArr.length; i++) {
                let key = sortArr[i].column;
                let order = sortArr[i].order;

                let firstValue = key == 5 || key == 4 || key == 0 || key == 6 ? parseFloat(first[key]) : first[key];
                let secondValue = key == 5 || key == 4 || key == 0 || key == 6 ? parseFloat(second[key]) : second[key];

                if (firstValue > secondValue) {
                    return order ? -1 : 1; // Если order true, то сортируем по убыванию
                } else if (firstValue < secondValue) {
                    return order ? 1 : -1; // Если order true, то сортируем по убыванию
                }
            }
            return 0;
        });

        props.filtering(arr);
    };

    const handleDescendingChange = (id) => {
        const newDescending = [...descending];
        newDescending[id - 1] = !newDescending[id - 1];
        
        setDescending( newDescending);
        
    };

    

 
    return (
        <div>
            <form onSubmit={ SortTable } onReset={clear }>
                <p> Первый уровень():
                    <Options property={selects[0]} change={f}></Options>
                    по убыванию? <input onChange={() => handleDescendingChange(1)} type="checkbox" id="fieldsFirstDesc"/>
                </p>
                <p> Второй уровень():
                    <Options property={selects[1]} change={f}></Options>   
                    по убыванию? <input onChange={() => handleDescendingChange(2)} type="checkbox" id="fieldsSecondDesc"/>
                </p>
                <p> Третий уровень():
                    <Options property={selects[2]} change={f}></Options>    
                    по убыванию? <input onChange={() => handleDescendingChange(3)} type="checkbox" id="fieldsThirdDesc"/>
                </p>

                <input type="submit" value="Сортировать" /> 
                <input type="reset" value="Сбросить сортировку"/>
            </form>
        </div>
    );
}

export default Sort