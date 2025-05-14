

const TableRow = (props) => {
    const cells = (props.isHead === "0") 
        ? props.row.map((item, index) => <td key={index}>{item}</td>) 
        : props.row.map((item, index) => <th key={index}>{item}</th>);
    
    return cells; // Возвращаем массив ячеек напрямую
}

export default TableRow;