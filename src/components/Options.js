let Options = (props) => {
        let head = props.property.data
        const options = head.map((item,index)=><option key={index}>{item}</option>)
        return( //disabled={props.state.disabled} onChange={(e) => props.change(props.state.id,e.target.value)}
            <select value={props.property.value} disabled={props.property.disAbled} onChange={(e) => props.change(props.property.id,e.target.value)}>
                {options}    
            </select> 
        )

}


export default Options