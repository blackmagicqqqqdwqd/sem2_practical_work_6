import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';
import Sort from './Sort.js';
import Chart from './Chart.js';
//

const Table = (props) => {
    const [filt, setFilt] = useState(props.data);
    const [dataTable, setDataTable] = useState(props.data);

    const updateDataTable = (value) => {
        setDataTable(value)
        setFilt(value)

    }
    const updateDataTable2 = (value) => {
        setDataTable(value)
    }

    const [activePage, setActivePage] = useState("1");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };
    //количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows);

    // пагинация
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    let pages;
    let countPage = props.amountRows;
    if (dataTable.length >= props.amountRows ) {

        pages = arr.map((item, index) => {
            if (activePage == index + 1) return <span className={'currentPage'} key={index} onClick={changeActive}> {item} </span>
            else return <span key={index} onClick={changeActive}> {item} </span>
        }
        );
    }
    else countPage = props.data.length;


    return (
        <>
            <Chart data={dataTable}></Chart>
            <h4>Фильтры</h4>
            <Filter filtering={updateDataTable} data={dataTable} fullData={props.data} />

            <Sort filtering={updateDataTable2} data={dataTable} fullData={filt}> </Sort>
            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={dataTable} amountRows={countPage} numPage={activePage} />
            </table>

            <div>
                {pages}
            </div>
        </>
    )
}

export default Table;